using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Branch;
using CoffeManagement.DTO.Category;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models;
using CoffeManagement.Repositories.CategoryRepo;

namespace CoffeManagement.Services.CategoryService
{
    public class CategoryService: ICategoryService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(IHttpContextAccessor httpContextAccessor, IMapper mapper, ICategoryRepository categoryRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        public async Task<int> CreateCategory(CreateCategoryRequest request)
        {
            var existedCategory = await _categoryRepository.GetByName(request.Name);
            if (existedCategory != null) throw new BadRequestException("This Category Name already existed.");

            var category = _mapper.Map<Category>(request);
            await _categoryRepository.Add(category);

            return category.Id;
        }

        public async Task<int> DeleteCategory(int id)
        {
            var existedCategory = await _categoryRepository.GetById(id);
            if (existedCategory == null || existedCategory.IsDeleted == true) throw new BadRequestException("Category not found.");

            existedCategory.IsDeleted = true;
            existedCategory.UpdatedAt = DateTime.Now;
            await _categoryRepository.Update(existedCategory);

            return existedCategory.Id;
        }

        public async Task<CategoryDetailResponse> GetCategoryDetail(int id)
        {
            var existedCategory = await _categoryRepository.GetById(id);
            if (existedCategory == null || existedCategory.IsDeleted == true) throw new BadRequestException("Category not found.");

            var detailCategory = _mapper.Map<CategoryDetailResponse>(existedCategory);

            return detailCategory;
        }

        public async Task<PagingListModel<CategoryResponse>> GetListCategory(PagingDTO pagingDto)
        {
            var categoryQueryable = _categoryRepository.GetQueryable().Where(b => b.IsDeleted == false);
            var pagingList = new PagingListModel<Category>(categoryQueryable, pagingDto.PageIndex, pagingDto.PageSize);
            var result = _mapper.Map<PagingListModel<CategoryResponse>>(pagingList);

            return result;
        }

        public async Task<int> UpdateCategory(UpdateCategoryRequest request)
        {
            var existedCategory = await _categoryRepository.GetById(request.Id);
            if (existedCategory == null || existedCategory.IsDeleted == true) throw new BadRequestException("Category not found.");

            if (request.Name != null)
            {
                var otherXxistedCategory = await _categoryRepository.GetByName(request.Name);
                if (otherXxistedCategory != null && otherXxistedCategory.Id != request.Id) throw new BadRequestException("This Category Name already existed.");
            }

            _mapper.Map(request, existedCategory);
            existedCategory.UpdatedAt = DateTime.Now;
            await _categoryRepository.Update(existedCategory);

            return existedCategory.Id;
        }
    }
}
