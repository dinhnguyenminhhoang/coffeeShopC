using AutoMapper;
using CoffeManagement.DTO.Summary;
using CoffeManagement.Models;
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
                .Select(o => new { OrderProfit = o.OrderDetails.Sum(od => od.Price * od.Quantity - od.TotalIngredientCost) - o.Discount })
                .Sum(o => o.OrderProfit) ?? 0;

            var lastWeekProfit = lastWeekOrderList
                .Where(o => o.Status.Equals(OrderStatus.ODR_COML.ToString()))
                .Select(o => new { OrderProfit = o.OrderDetails.Sum(od => od.Price * od.Quantity - od.TotalIngredientCost) - o.Discount })
                .Sum(o => o.OrderProfit) ?? 0;


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

        public async Task<object> GetAmountSoldOfCategory_Chart(SummaryFilter filter)
        {
            var query = _orderDetailRepository.GetQueryable();


            if (filter.BranchId != null)
            {
                query = query.Where(o => o.Order.BranchId == filter.BranchId);
            }

            query = query.Where(od => od.Order.Status.Equals(OrderStatus.ODR_COML.ToString()));

            if (filter.StartDate != null)
                query = query.Where(o => o.Order.CreatedAt >= filter.StartDate);

            if (filter.EndDate != null)
                query = query.Where(o => o.Order.CreatedAt <= filter.EndDate);

            var amountSolds = query.GroupBy(od => od.Drink.CategoryId)
                .Select(group => new
                {
                    CategoryId = group.Key,
                    AmountSold = group.Sum(od => od.Quantity)
                })
                .OrderByDescending(result => result.AmountSold)
                .Join(
                    _categoryRepository.GetQueryable(),
                    topSellCategory => topSellCategory.CategoryId,
                    category => category.Id,
                    (topSellCategory, category) => new
                    {
                        Name = category.Name,
                        Value = topSellCategory.AmountSold,
                    })
                .ToList();


            if (filter.Limit < amountSolds.Count())
            {
                var result = amountSolds.Take(filter.Limit - 1).ToList();
                int totalAmountSoldOthers = amountSolds.Skip(filter.Limit - 1).Sum(item => item.Value);
                result.Add(new { Name = "Others", Value = totalAmountSoldOthers });
                return result;
            }
            else
            {
                var result = amountSolds.Take(filter.Limit).ToList();
                return result;
            }
        }

        public async Task<object> GetOverview_Chart(SummaryFilter filter)
        {
            IQueryable<Order> query = _orderRepository.GetQueryable();
            IQueryable<TinyOrder> tinyQuery;
            IEnumerable<IGrouping<string, TinyOrder>> groupQuery;
            TimeSpan dateDifference;

            if (filter.BranchId != null)
            {
                query = query.Where(o => o.BranchId == filter.BranchId);
            }

            if (filter.StartDate != null)
                query = query.Where(o => o.CreatedAt >= filter.StartDate);

            if (filter.EndDate != null)
                query = query.Where(o => o.CreatedAt <= filter.EndDate);


            tinyQuery = query.Select(o => new TinyOrder
            {
                Status = o.Status,
                CreatedAt = o.CreatedAt ?? DateTime.Now,
                Revenue = o.TotalPrice - (o.Discount ?? 0),
                Profit = o.TotalPrice - (o.Discount ?? 0) - o.OrderDetails.Sum(od => od.TotalIngredientCost),
            });


            if (filter.StartDate != null && filter.EndDate == null)
                dateDifference = DateTime.Now - filter.StartDate.Value;
            else if (filter.StartDate == null && filter.EndDate != null)
                dateDifference = filter.EndDate.Value - (new DateTime());
            else if (filter.StartDate != null && filter.EndDate != null)
                dateDifference = filter.EndDate.Value - filter.StartDate.Value;
            else
                dateDifference = DateTime.Now - (new DateTime());

            if (dateDifference.TotalDays <= 7)
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("ddd"));
            }
            else if (dateDifference.TotalDays <= 14)
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("dd MMM"));
            }
            else if (dateDifference.TotalDays <= 3 * 7 * 4)
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => $"Week {ToWeek(od.CreatedAt)}");
            }
            else if (dateDifference.TotalDays <= 20 * 30)
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("MMM yyyy"));
            }
            else
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("yyyy"));
            }

            var result = groupQuery.Select(group => new
            {
                At = group.Key,
                Orders = group.Count(),
                Revenue = group.Where(tod => tod.Status.Equals(OrderStatus.ODR_COML.ToString())).Sum(tod => tod.Revenue),
                Profit = group.Where(tod => tod.Status.Equals(OrderStatus.ODR_COML.ToString())).Sum(tod => tod.Profit),
            });

            return result;
        }

        public async Task<object> GetOrders_Chart(SummaryFilter filter)
        {
            IQueryable<Order> query = _orderRepository.GetQueryable();
            IEnumerable<IGrouping<string, Order>> groupQuery;
            TimeSpan dateDifference;

            if (filter.BranchId != null)
            {
                query = query.Where(o => o.BranchId == filter.BranchId);
            }

            if (filter.StartDate != null)
                query = query.Where(o => o.CreatedAt >= filter.StartDate);

            if (filter.EndDate != null)
                query = query.Where(o => o.CreatedAt <= filter.EndDate);


            if (filter.StartDate != null && filter.EndDate == null)
                dateDifference = DateTime.Now - filter.StartDate.Value;
            else if (filter.StartDate == null && filter.EndDate != null)
                dateDifference = filter.EndDate.Value - (new DateTime());
            else if (filter.StartDate != null && filter.EndDate != null)
                dateDifference = filter.EndDate.Value - filter.StartDate.Value;
            else
                dateDifference = DateTime.Now - (new DateTime());

            if (dateDifference.TotalDays <= 7)
            {
                groupQuery = query.AsEnumerable().GroupBy(o => o.CreatedAt?.ToString("ddd"));
            }
            else if (dateDifference.TotalDays <= 14)
            {
                groupQuery = query.AsEnumerable().GroupBy(o => o.CreatedAt?.ToString("dd MMM"));
            }
            else if (dateDifference.TotalDays <= 3 * 7 * 4)
            {
                groupQuery = query.AsEnumerable().GroupBy(o => $"Week {ToWeek(o.CreatedAt ?? DateTime.Now)}");
            }
            else if (dateDifference.TotalDays <= 20 * 30)
            {
                groupQuery = query.AsEnumerable().GroupBy(o => o.CreatedAt?.ToString("MMM yyyy"));
            }
            else
            {
                groupQuery = query.AsEnumerable().GroupBy(o => o.CreatedAt?.ToString("yyyy"));
            }

            var result = groupQuery.Select(group => new
            {
                At = group.Key,
                Init = group.Where(o => o.Status.Equals(OrderStatus.ODR_INIT.ToString())).Count(),
                Comfirm = group.Where(o => o.Status.Equals(OrderStatus.ODR_COMF.ToString())).Count(),
                Served = group.Where(o => o.Status.Equals(OrderStatus.ODR_SERV.ToString())).Count(),
                Shipping = group.Where(o => o.Status.Equals(OrderStatus.ODR_SHIP.ToString())).Count(),
                Shipped = group.Where(o => o.Status.Equals(OrderStatus.ODR_SHIPED.ToString())).Count(),
                Completed = group.Where(o => o.Status.Equals(OrderStatus.ODR_COML.ToString())).Count(),
                Canceled = group.Where(o => o.Status.Equals(OrderStatus.ODR_CANL.ToString())).Count(),
                Failed = group.Where(o => o.Status.Equals(OrderStatus.ODR_FAIL.ToString())).Count(),
            });

            return result;
        }

        public async Task<object> GetRevenueAndProfit_Chart(SummaryFilter filter)
        {
            IQueryable<Order> query = _orderRepository.GetQueryable().Where(o => o.Status.Equals(OrderStatus.ODR_COML.ToString()));
            IQueryable<TinyOrder> tinyQuery;
            IEnumerable<IGrouping<string, TinyOrder>> groupQuery;
            TimeSpan dateDifference;


            if (filter.BranchId != null)
            {
                query = query.Where(o => o.BranchId == filter.BranchId);
            }


            if (filter.StartDate != null)
                query = query.Where(o => o.CreatedAt >= filter.StartDate);

            if (filter.EndDate != null)
                query = query.Where(o => o.CreatedAt <= filter.EndDate);


            tinyQuery = query.Select(o => new TinyOrder
            {
                CreatedAt = o.CreatedAt ?? DateTime.Now,
                Revenue = o.TotalPrice - (o.Discount ?? 0),
                Profit = o.TotalPrice - (o.Discount ?? 0) - o.OrderDetails.Sum(od => od.TotalIngredientCost),
            });


            if (filter.StartDate != null && filter.EndDate == null)
                dateDifference = DateTime.Now - filter.StartDate.Value;
            else if (filter.StartDate == null && filter.EndDate != null)
                dateDifference = filter.EndDate.Value - (new DateTime());
            else if (filter.StartDate != null && filter.EndDate != null)
                dateDifference = filter.EndDate.Value - filter.StartDate.Value;
            else
                dateDifference = DateTime.Now - (new DateTime());

            if (dateDifference.TotalDays <= 7)
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("ddd"));
            }
            else if (dateDifference.TotalDays <= 14)
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("dd MMM"));
            }
            else if (dateDifference.TotalDays <= 3 * 7 * 4)
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => $"Week {ToWeek(od.CreatedAt)}");
            }
            else if (dateDifference.TotalDays <= 20 * 30)
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("MMM yyyy"));
            }
            else
            {
                groupQuery = tinyQuery.AsEnumerable().GroupBy(od => od.CreatedAt.ToString("yyyy"));
            }

            var result = groupQuery.Select(group => new
            {
                At = group.Key,
                Revenue = group.Sum(tod => tod.Revenue),
                Profit = group.Sum(tod => tod.Profit),
            });

            return result;
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

    internal class TinyOrder
    {
        public string Status { get; set; }
        public double Revenue { get; set; }
        public double Profit { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
