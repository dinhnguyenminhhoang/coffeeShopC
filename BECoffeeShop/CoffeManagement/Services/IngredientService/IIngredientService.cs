using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Ingredient;
using CoffeManagement.DTO.Paging;

namespace CoffeManagement.Services.IngredientService
{
    public interface IIngredientService
    {
        Task<PagingListModel<IngredientResponse>> GetListIngredient(PagingDTO pagingDto);
        Task<int> CreateIngredient(CreateIngredientRequest request);
        Task<int> UpdateIngredient(UpdateIngredientRequest request);
        Task<IngredientDetailResponse> GetIngredientDetail(int id);
        Task<int> DeleteIngredient(int id);
        Task<int> AddIngredientStock(CreateIngredientStockRequest request);
    }
}
