using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Ingredient;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models;
using CoffeManagement.Repositories.IngredientRepo;

namespace CoffeManagement.Services.IngredientService
{
    public class IngredientService : IIngredientService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IIngredientRepository _ingredientRepository;
        private readonly IIngredientStockRepository _ingredientStockRepository;

        public IngredientService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IIngredientRepository ingredientRepository, IIngredientStockRepository ingredientStockRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _ingredientRepository = ingredientRepository;
            _ingredientStockRepository = ingredientStockRepository;
        }

        public async Task<int> AddIngredientStock(CreateIngredientStockRequest request)
        {
            var ingredientStock = _mapper.Map<IngredientStock>(request);
            ingredientStock.Remain = ingredientStock.Amount;

            await _ingredientStockRepository.Add(ingredientStock);

            return ingredientStock.Id;
        }

        public async Task<int> CreateIngredient(CreateIngredientRequest request)
        {
            var ingredient = _mapper.Map<Ingredient>(request);
            await _ingredientRepository.Add(ingredient);

            return ingredient.Id;

        }

        public async Task<int> DeleteIngredient(int id)
        {
            var existedIngredient = await _ingredientRepository.GetById(id);
            if (existedIngredient == null || existedIngredient.IsDeleted == true) throw new NotFoundException("Not found Ingredient.");

            existedIngredient.IsDeleted = true;
            existedIngredient.UpdatedAt = DateTime.Now;
            await _ingredientRepository.Update(existedIngredient);

            return existedIngredient.Id;
        }

        public async Task<IngredientDetailResponse> GetIngredientDetail(int id)
        {
            var existedIngredient = await _ingredientRepository.GetById(id);
            if (existedIngredient == null || existedIngredient.IsDeleted == true) throw new NotFoundException("Not found Ingredient.");

            var ingredientDetail = _mapper.Map<IngredientDetailResponse>(existedIngredient);

            return ingredientDetail;
        }

        public async Task<PagingListModel<IngredientResponse>> GetListIngredient(PagingDTO pagingDto)
        {
            var ingredientQueryable = _ingredientRepository.GetQueryable().Where(b => b.IsDeleted == false);

            var pagingList = new PagingListModel<Ingredient>(ingredientQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<IngredientResponse>>(pagingList);

            return result;
        }

        public async Task<int> UpdateIngredient(UpdateIngredientRequest request)
        {
            var existedIngredient = await _ingredientRepository.GetById(request.Id);
            if (existedIngredient == null || existedIngredient.IsDeleted == true) throw new NotFoundException("Not found Ingredient.");

            _mapper.Map(request, existedIngredient);
            existedIngredient.UpdatedAt = DateTime.Now;
            await _ingredientRepository.Update(existedIngredient);

            return existedIngredient.Id;
        }
    }
}
