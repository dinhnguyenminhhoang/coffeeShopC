using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Drink;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models;
using CoffeManagement.Repositories.DrinkRepo;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.DrinkService
{
    public class DrinkService : IDrinkService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IDrinkRepository _drinkRepository;
        private readonly IDrinkSizeRepository _drinksSizeRepository;

        public DrinkService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IDrinkRepository drinkRepository, IDrinkSizeRepository drinksSizeRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _drinkRepository = drinkRepository;
            _drinksSizeRepository = drinksSizeRepository;
        }

        public async Task<PagingListModel<DrinkResponse>> GetListDrinks([FromQuery] PagingDTO pagingDto)
        {
            var drinkQueryable = _drinkRepository.GetQueryable();

            var pagingList = new PagingListModel<Drink>(drinkQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<DrinkResponse>>(pagingList);

            return result;
        }

        public async Task<int> CreateDrinks(CreateDrinkRequest request)
        {
            var drinks = _mapper.Map<Drink>(request);

            await _drinkRepository.Add(drinks);

            return drinks.Id;
        }
        
        public async Task<int> UpdateDrinks(UpdateDrinkRequest request)
        {
            var drinks = _mapper.Map<Drink>(request);

            await _drinkRepository.Update(drinks);

            return drinks.Id;
        }

        public async Task<DrinkDetailResponse> GetDrinksDetail(int id)
        {
            var drink = await _drinkRepository.GetById(id);

            if (drink == null) throw new NotFoundException("Not found Drinks.");

            var drinkDetail = _mapper.Map<DrinkDetailResponse>(drink);
                        

            return drinkDetail;
        }

        public async Task<int> DeleteDrinksSize(int id)
        {
            var drinksSize = await _drinksSizeRepository.GetById(id);

            if (drinksSize == null) throw new NotFoundException("Not found Drinks Size.");

            await _drinksSizeRepository.Remove(id);

            return drinksSize.Id;
        }

        public async Task<int> CreateDrinksSize(CreateDrinkSizeRequest request)
        {
            var drinksSize = _mapper.Map<Models.DrinkSize>(request);

            await _drinksSizeRepository.Add(drinksSize);

            return drinksSize.Id;
        }

        public async Task<int> UpdateDrinksSize(UpdateDrinkSizeRequest request)
        {
            var drinksSizeExist = await _drinksSizeRepository.GetById(request.Id);

            if (drinksSizeExist == null) throw new NotFoundException("Not found Drinks Size.");

            _mapper.Map(request, drinksSizeExist);

            await _drinksSizeRepository.Update(drinksSizeExist);

            return drinksSizeExist.Id;
        }
    }
}
