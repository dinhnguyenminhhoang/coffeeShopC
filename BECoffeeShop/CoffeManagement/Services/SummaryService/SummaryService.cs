using AutoMapper;
using CoffeManagement.DTO.Summary;
using CoffeManagement.Models.Enum;
using CoffeManagement.Repositories.BranchRepo;
using CoffeManagement.Repositories.CategoryRepo;
using CoffeManagement.Repositories.CustomerRepo;
using CoffeManagement.Repositories.DrinkRepo;
using CoffeManagement.Repositories.OrderRepo;
using CoffeManagement.Repositories.StaffRepo;
using System.Globalization;

namespace CoffeManagement.Services.SummaryService
{
    public class SummaryService : ISummaryService
    {

        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IStaffRepository _staffRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IDrinkRepository _drinkRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IBranchRepository _branchRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;

        public SummaryService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IStaffRepository staffRepository, ICustomerRepository customerRepository, IDrinkRepository drinkRepository,
            ICategoryRepository categoryRepository, IBranchRepository branchRepository, IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _staffRepository = staffRepository;
            _customerRepository = customerRepository;
            _drinkRepository = drinkRepository;
            _categoryRepository = categoryRepository;
            _branchRepository = branchRepository;
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
        }

        public async Task<object> GetParameters()
        {
            DateTime today = DateTime.Today;
            DateTime startOfWeek = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
            if (startOfWeek > today) startOfWeek = startOfWeek.AddDays(-7);
            DateTime startOfLastWeek = startOfWeek.AddDays(-7);

            // Total
            var total = new List<object>
            {
                new { Label = "Customers", Value = (await _customerRepository.GetAll()).Count() },
                new { Label = "Staffs", Value = (await _staffRepository.GetAll()).Count() },
                new { Label = "Drinks", Value = (await _drinkRepository.GetAll()).Count() },
                new { Label = "Branches", Value = (await _branchRepository.GetAll()).Count() },
                new { Label = "Categories", Value = (await _categoryRepository.GetAll()).Count() },
                new { Label = "Orders", Value = (await _orderRepository.GetAll()).Count() },
            };


            // This Week
            var thisWeekOrderList = _orderRepository.GetQueryable()
                .Where(o => o.CreatedAt >= startOfWeek && o.CreatedAt < DateTime.Now)
                .ToList();
            var lastWeekOrderList = _orderRepository.GetQueryable()
                .Where(o => o.CreatedAt >= startOfLastWeek && o.CreatedAt < startOfWeek)
                .ToList();

            // Customers
            var thisWeekCustomer = _customerRepository.GetQueryable()
                .Where(o => o.CreatedAt >= startOfWeek && o.CreatedAt < DateTime.Now)
                .Count();
            var lastWeekCustomer = _customerRepository.GetQueryable()
                .Where(o => o.CreatedAt >= startOfLastWeek && o.CreatedAt < startOfWeek)
                .Count();

            // Orders
            var thisWeekOrder = thisWeekOrderList.Count();
            var lastWeekOrder = lastWeekOrderList.Count();

            // Revenue
            var thisWeekRevenue = thisWeekOrderList
                .Where(o => o.Status.Equals(OrderStatus.ODR_COML.ToString()))
                .Sum(o => (o.TotalPrice - o.Discount)) ?? 0;

            var lastWeekRevenue = lastWeekOrderList
                .Where(o => o.Status.Equals(OrderStatus.ODR_COML.ToString()))
                .Sum(o => (o.TotalPrice - o.Discount)) ?? 0;

            // Profit
            var thisWeekProfit = thisWeekOrderList
                .Where(o => o.Status.Equals(OrderStatus.ODR_COML.ToString()))
                .SelectMany(o => o.OrderDetails)
                .Sum(od => od.Price * od.Quantity - od.TotalIngredientCost);

            var lastWeekProfit = lastWeekOrderList
                .Where(o => o.Status.Equals(OrderStatus.ODR_COML.ToString()))
                .SelectMany(o => o.OrderDetails)
                .Sum(od => od.Price * od.Quantity - od.TotalIngredientCost);


            double revenueGrowthPercentage = CalculateGrowthPercentage(lastWeekRevenue, thisWeekRevenue);
            double profitGrowthPercentage = CalculateGrowthPercentage(lastWeekProfit, thisWeekProfit);
            double orderGrowthPercentage = CalculateGrowthPercentage(lastWeekOrder, thisWeekOrder);
            double customerGrowthPercentage = CalculateGrowthPercentage(lastWeekCustomer, thisWeekCustomer);


            return new
            {
                ThisWeek = new object[]
                {
                    new  {
                        Title = "Revenue",
                        Value = thisWeekRevenue,
                        GrowthPercent = revenueGrowthPercentage
                    },
                    new  {
                        Title = "Profit",
                        Value = thisWeekProfit,
                        GrowthPercent = profitGrowthPercentage
                    },
                    new  {
                        Title = "Orders",
                        Value = thisWeekOrder,
                        GrowthPercent = orderGrowthPercentage
                    },
                    new  {
                        Title = "Customers",
                        Value = thisWeekCustomer,
                        GrowthPercent = customerGrowthPercentage
                    }
                },
                Total = total,
            };
        }

        public async Task<object> GetBestSellDrinks_Table(SummaryFilter filter)
        {
            var query = _orderDetailRepository.GetQueryable();

            if (filter.BranchId != null)
            {
                query = query.Where(od => od.Order.BranchId == filter.BranchId);
            }

            query = query.Where(od => od.Order.Status.Equals(OrderStatus.ODR_COML.ToString()));


            if (filter.StartDate != null)
                query = query.Where(o => o.Order.CreatedAt >= filter.StartDate);

            if (filter.EndDate != null)
                query = query.Where(o => o.Order.CreatedAt <= filter.EndDate);


            var topDrinks = query
                .GroupBy(od => od.DrinkId)
                .Select(group => new
                {
                    DrinkId = group.Key,
                    TotalQuantitySold = group.Sum(od => od.Quantity)
                })
                .OrderByDescending(result => result.TotalQuantitySold)
                .Take(filter.Limit)
                .Join(
                    _drinkRepository.GetQueryable(),
                    topSellDrink => topSellDrink.DrinkId,
                    drink => drink.Id,
                    (topSellDrink, drink) => new
                    {
                        Id = topSellDrink.DrinkId,
                        Name = drink.Name,
                        Image = drink.Image,
                        Rating = drink.DrinkRatings.Count() != 0 ? drink.DrinkRatings.Average(dr => dr.Rating) : 0,
                        RattingAmount = drink.DrinkRatings.Count(),
                        TotalQuantitySold = topSellDrink.TotalQuantitySold
                    })
                .ToList();

            return topDrinks;
        }

        public async Task<object> GetBestSellStaff_Table(SummaryFilter filter)
        {
            var query = _orderRepository.GetQueryable();

            if (filter.BranchId != null)
            {
                query = query.Where(o => o.BranchId == filter.BranchId);
            }

            query = query.Where(o => o.Status.Equals(OrderStatus.ODR_COML.ToString()));

            if (filter.StartDate != null)
                query = query.Where(o => o.CreatedAt >= filter.StartDate);

            if (filter.EndDate != null)
                query = query.Where(o => o.CreatedAt <= filter.EndDate);


            var topStaffs = query
            .GroupBy(o => o.StaffId)
            .Select(group => new
            {
                StaffId = group.Key,
                TotalOrderSold = group.Count(),
                TotalValueSold = group.Sum(o => o.TotalPrice),
            })
            .OrderByDescending(result => result.TotalOrderSold)
            .Take(filter.Limit)
            .Join(
                _staffRepository.GetQueryable(),
                topSellStaff => topSellStaff.StaffId,
                staff => staff.Id,
                (topSellStaff, staff) => new
                {
                    Id = topSellStaff.StaffId,
                    Name = staff.FullName,
                    Avatar = staff.Avatar,
                    TotalOrderSold = topSellStaff.TotalOrderSold,
                    TotalValueSold = topSellStaff.TotalValueSold,
                })
            .ToList();

            return topStaffs;
        }

        public async Task<object> GetRecentOrders_Table(SummaryFilter filter)
        {
            var query = _orderRepository.GetQueryable();

            if (filter.BranchId != null)
            {
                query = query.Where(o => o.BranchId == filter.BranchId);
            }

            if (filter.StartDate != null)
                query = query.Where(o => o.CreatedAt >= filter.StartDate);

            if (filter.EndDate != null)
                query = query.Where(o => o.CreatedAt <= filter.EndDate);

            var recentOrders = query.Take(filter.Limit)
                .Select(o => new
                {
                    Id = o.Id,
                    Date = o.CreatedAt,
                    CustomerName = o.Customer != null ? o.Customer.FullName : "Anonymous",
                    TotalPrice = o.TotalPrice,
                    Status = o.Status,
                })
                .ToList();

            return recentOrders;
        }

        public Task<object> GetAmountSoldOfCategory_Chart(SummaryFilter filter)
        {
            throw new NotImplementedException();
        }

        public Task<object> GetOverview_Chart(SummaryFilter filter)
        {
            throw new NotImplementedException();
        }

        public Task<object> GetOrders_Chart(SummaryFilter filter)
        {
            throw new NotImplementedException();
        }

        public Task<object> GetRevenueAndProfit_Chart(SummaryFilter filter)
        {
            throw new NotImplementedException();
        }

        private double CalculateGrowthPercentage(double lastWeekValue, double thisWeekValue)
        {
            return lastWeekValue != 0
                ? double.Round(((thisWeekValue - lastWeekValue) / lastWeekValue) * 100, 2, MidpointRounding.AwayFromZero)
                : 100;
        }

        private string ToWeek(DateTime d)
        {
            return CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(d, CalendarWeekRule.FirstDay, DayOfWeek.Monday).ToString();
        }

    }
}
