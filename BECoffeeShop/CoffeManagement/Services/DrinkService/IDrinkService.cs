using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Drink;
using CoffeManagement.DTO.Paging;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.DrinkService
{
    public interface IDrinkService
    {
        Task<PagingListModel<DrinkResponse>> GetListDrinks(PagingDTO pagingDto, ListDinkFilter filter);
        Task<int> CreateDrinks(CreateDrinkRequest request);
        Task<int> UpdateDrinks(UpdateDrinkRequest request);
        Task<DrinkDetailResponse> GetDrinksDetail(int id);
        Task<int> DeleteDrinksSize(int id);
        Task<int> CreateDrinksSize(CreateDrinkSizeRequest request);
        Task<int> UpdateDrinksSize(UpdateDrinkSizeRequest request);
        Task<int> UpdateRecipe(UpdateRecipeRequest request);
    }
}
