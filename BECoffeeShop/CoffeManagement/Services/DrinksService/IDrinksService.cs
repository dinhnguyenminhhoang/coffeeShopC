using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Drinks;
using CoffeManagement.DTO.Paging;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.DrinksService
{
    public interface IDrinksService
    {
        Task<PagingListModel<DrinksResponse>> GetListDrinks(PagingDTO pagingDto);
        Task<int> CreateDrinks(CreateDrinksRequest createDrinksRequest);
    }
}
