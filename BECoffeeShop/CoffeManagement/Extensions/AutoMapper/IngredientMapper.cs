using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadIngredientMapperProfile()
        {
            CreateMap<Models.Ingredient, DTO.Ingredient.IngredientResponse>();
            CreateMap<Models.IngredientStock, DTO.Ingredient.IngredientStockDetail>();
            CreateMap<Models.Ingredient, DTO.Ingredient.IngredientDetailResponse>()
                .ForMember(dest => dest.IngredientStocks, otp => otp.MapFrom(src => src.IngredientStocks.AsEnumerable()));
            CreateMap<Models.Ingredient, DTO.Ingredient.IngredientResponse>();
            CreateMap<Common.Pagging.PagingListModel<Models.Ingredient>, Common.Pagging.PagingListModel<DTO.Ingredient.IngredientResponse>>();
            CreateMap<DTO.Ingredient.CreateIngredientRequest, Models.Ingredient>();
            CreateMap<DTO.Ingredient.CreateIngredientStockRequest, Models.IngredientStock>();
            CreateMap<DTO.Ingredient.UpdateIngredientRequest, Models.Ingredient>();
        }
    }
}
