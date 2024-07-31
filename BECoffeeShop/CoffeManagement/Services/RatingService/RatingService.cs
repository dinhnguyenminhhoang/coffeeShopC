using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Order;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Rating;
using CoffeManagement.Infrastructure.Jwt;
using CoffeManagement.Models;
using CoffeManagement.Repositories.CustomerRepo;
using CoffeManagement.Repositories.DrinkRepo;
using CoffeManagement.Repositories.OrderRepo;
using CoffeManagement.Repositories.RatingRepo;
using CoffeManagement.Repositories.StaffRepo;

namespace CoffeManagement.Services.RatingService
{
    public class RatingService : IRatingService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IDrinkRatingRepository _drinkRatingRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IStaffRepository _staffRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IDrinkRepository _drinRepository;

        public RatingService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IDrinkRatingRepository drinkRatingRepository, IOrderRepository orderRepository, IStaffRepository staffRepository, ICustomerRepository customerRepository, IDrinkRepository drinRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _drinkRatingRepository = drinkRatingRepository;
            _orderRepository = orderRepository;
            _customerRepository = customerRepository;
            _staffRepository = staffRepository;
            _drinRepository = drinRepository;
        }

        public async Task<int> CreateDrinksRating(CreateDrinkRatingRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedCustomer = await _customerRepository.GetByPhone(phone);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            var existedOrder = await _orderRepository.GetById(request.OrderId);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (existedOrder.CustomerId != existedCustomer.Id) throw new BadRequestException("Order does not belong to this Customer");
            if (!existedOrder.OrderDetails.Any(od => od.DrinkId == request.DrinkId)) throw new BadRequestException("Not found Drink in Order");

            var drinkRating = _mapper.Map<DrinkRating>(request);
            await _drinkRatingRepository.Add(drinkRating);

            return drinkRating.Id;
        }

        public async Task<int> UpdateDrinksRating(UpdateDrinkRatingRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedCustomer = await _customerRepository.GetByPhone(phone);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            var existedDrinkRating = await _drinkRatingRepository.GetById(request.Id);
            if (existedDrinkRating == null) throw new NotFoundException("Not found Drink Rating.");
            if (existedDrinkRating.Order.CustomerId != existedCustomer.Id) throw new BadRequestException("Drink Rating does not belong to this Customer");

            _mapper.Map(request, existedDrinkRating);
            existedDrinkRating.UpdatedAt = DateTime.Now;

            await _drinkRatingRepository.Update(existedDrinkRating);

            return existedDrinkRating.Id;
        }

        public async Task<int> FeedbackDrinksRating(FeedbackDrinkRatingRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var existedDrinkRating = await _drinkRatingRepository.GetById(request.Id);
            if (existedDrinkRating == null) throw new NotFoundException("Not found Drink Rating.");

            _mapper.Map(request, existedDrinkRating);
            existedDrinkRating.FeedbackStaffId = existedStaff.Id;
            existedDrinkRating.FeedbackAt = DateTime.Now;
            existedDrinkRating.UpdatedAt = DateTime.Now;

            await _drinkRatingRepository.Update(existedDrinkRating);

            return existedDrinkRating.Id;
        }

        public async Task<DrinkRatingDetailResponse> DetailDrinksRating(int id)
        {
            var existedDrinkRating = await _drinkRatingRepository.GetById(id);
            if (existedDrinkRating == null) throw new NotFoundException("Not found Drink Rating.");

            var detailDrinksRating = _mapper.Map<DrinkRatingDetailResponse>(existedDrinkRating);

            return detailDrinksRating;
        }

        public async Task<PagingListModel<DrinkRatingResponse>> DrinksRatingListAll(PagingDTO pagingDTO)
        {
            var drinkRatingQueryable = _drinkRatingRepository.GetQueryable();
            drinkRatingQueryable = drinkRatingQueryable.OrderByDescending(dr => dr.CreatedAt);

            var pagingList = new PagingListModel<DrinkRating>(drinkRatingQueryable, pagingDTO.PageIndex, pagingDTO.PageSize);
            var result = _mapper.Map<PagingListModel<DrinkRatingResponse>>(pagingList);

            return result;
        }

        public async Task<PagingListModel<DrinkRatingResponse>> DrinksRatingList(int drinkId, PagingDTO pagingDTO)
        {
            var existedDrink = await _drinRepository.GetById(drinkId);
            if (existedDrink == null) throw new NotFoundException("Not found Drinks.");

            var drinkRatingQueryable = _drinkRatingRepository.GetQueryable();
            drinkRatingQueryable = drinkRatingQueryable.Where(dr => dr.DrinkId == drinkId).OrderByDescending(dr => dr.CreatedAt);

            var pagingList = new PagingListModel<DrinkRating>(drinkRatingQueryable, pagingDTO.PageIndex, pagingDTO.PageSize);
            var result = _mapper.Map<PagingListModel<DrinkRatingResponse>>(pagingList);

            return result;
        }
    }
}
