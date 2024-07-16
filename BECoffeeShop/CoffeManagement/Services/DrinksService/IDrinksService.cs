using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Drinks.Request;
using CoffeManagement.DTO.Drinks.Response;
using CoffeManagement.DTO.Pagging;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.DrinksService
{
    public interface IDrinksService
    {
        Task<PagingListModel<DrinksResponse>> GetListDrinks(PagingDTO pagingDto);
        Task<int> CreateDrinks(CreateDrinksRequest createDrinksRequest);
    }
}
