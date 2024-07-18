using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Drinks;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models;
using CoffeManagement.Repositories.DrinksRepo;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.DrinksService
{
    public class DrinksService : IDrinksService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IDrinkRepository _drinkRepository;
        private readonly IDrinksSizeRepository _drinksSizeRepository;

        public DrinksService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IDrinkRepository drinkRepository, IDrinksSizeRepository drinksSizeRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _drinkRepository = drinkRepository;
            _drinksSizeRepository = drinksSizeRepository;
        }

        public async Task<PagingListModel<DrinksResponse>> GetListDrinks([FromQuery] PagingDTO pagingDto)
        {
            var drinkQueryable = _drinkRepository.GetQueryable();

            var pagingList = new PagingListModel<Drinks>(drinkQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<DrinksResponse>>(pagingList);

            return result;
        }

        public async Task<int> CreateDrinks(CreateDrinksRequest request)
        {
            var drinks = _mapper.Map<Drinks>(request);

            await _drinkRepository.Add(drinks);

            return drinks.Id;
        }
        
        public async Task<int> UpdateDrinks(UpdateDrinksRequest request)
        {
            var drinks = _mapper.Map<Drinks>(request);

            await _drinkRepository.Update(drinks);

            return drinks.Id;
        }

        public async Task<DrinksDetailResponse> GetDrinksDetail(int id)
        {
            var drink = await _drinkRepository.GetById(id);

            if (drink == null) throw new NotFoundException("Not found Drinks.");

            var drinkDetail = _mapper.Map<DrinksDetailResponse>(drink);

            return drinkDetail;
        }

        public async Task<int> DeleteDrinksSize(int id)
        {
            var drinksSize = await _drinksSizeRepository.GetById(id);

            if (drinksSize == null) throw new NotFoundException("Not found Drinks Size.");

            await _drinksSizeRepository.Remove(id);

            return drinksSize.Id;
        }

        public async Task<int> CreateDrinksSize(CreateDrinksSizeRequest request)
        {
            var drinksSize = _mapper.Map<Models.DrinksSize>(request);

            await _drinksSizeRepository.Add(drinksSize);

            return drinksSize.Id;
        }

        public async Task<int> UpdateDrinksSize(UpdateDrinksSizeRequest request)
        {
            var drinksSizeExist = await _drinksSizeRepository.GetById(request.Id);

            if (drinksSizeExist == null) throw new NotFoundException("Not found Drinks Size.");

            _mapper.Map(request, drinksSizeExist);

            await _drinksSizeRepository.Update(drinksSizeExist);

            return drinksSizeExist.Id;
        }
    }
}
