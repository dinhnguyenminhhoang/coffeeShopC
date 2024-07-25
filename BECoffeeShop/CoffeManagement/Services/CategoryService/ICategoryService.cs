using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Category;
using CoffeManagement.DTO.Paging;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<PagingListModel<CategoryResponse>> GetListCategory(PagingDTO pagingDto);
        Task<CategoryDetailResponse> GetCategoryDetail(int id);
        Task<int> DeleteCategory(int id);
        Task<int> CreateCategory(CreateCategoryRequest request);
        Task<int> UpdateCategory(UpdateCategoryRequest request);
    }
}
