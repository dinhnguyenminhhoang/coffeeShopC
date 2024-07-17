using AutoMapper;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Drinks.Request;
using CoffeManagement.DTO.Drinks.Response;
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

        public DrinksService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IDrinkRepository drinkRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _drinkRepository = drinkRepository;
        }

        public async Task<PagingListModel<DrinksResponse>> GetListDrinks([FromQuery] PagingDTO pagingDto)
        {
            var drinkQueryable = _drinkRepository.GetQueryable();

            var pagingList = new PagingListModel<Drinks>(drinkQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<DrinksResponse>>(pagingList);

            return result;
        }


        public async Task<int> CreateDrinks(CreateDrinksRequest createDrinksRequest)
        {
            var drinks = _mapper.Map<Drinks>(createDrinksRequest);

            await _drinkRepository.Add(drinks);

            return drinks.Id;
        }
    }
}
