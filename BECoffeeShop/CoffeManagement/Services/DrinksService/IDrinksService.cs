using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Drinks;
using CoffeManagement.DTO.Paging;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.DrinksService
{
    public interface IDrinksService
    {
        Task<PagingListModel<DrinksResponse>> GetListDrinks(PagingDTO pagingDto);
        Task<int> CreateDrinks(CreateDrinksRequest request);
        Task<int> UpdateDrinks(UpdateDrinksRequest request);
        Task<DrinksDetailResponse> GetDrinksDetail(int id);
        Task<int> DeleteDrinksSize(int id);
        Task<int> CreateDrinksSize(CreateDrinksSizeRequest request);
        Task<int> UpdateDrinksSize(UpdateDrinksSizeRequest request);
    }
}
