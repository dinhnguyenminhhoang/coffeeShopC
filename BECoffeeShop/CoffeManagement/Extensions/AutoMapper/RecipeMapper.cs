using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        public void LoadRecipeMapperProfile()
        {
            CreateMap<DTO.Drink.RecipeCreate, Models.Recipe>()
                .ForMember(dest => dest.RecipeDetails, otp => otp.MapFrom(src => src.RecipeDetails));
            CreateMap<DTO.Drink.RecipeDetailCreate, Models.RecipeDetail>();
            CreateMap<DTO.Drink.Recipe, Models.Recipe>();
            CreateMap<DTO.Drink.RecipeDetail, Models.RecipeDetail>();
            CreateMap<Models.Recipe, DTO.Drink.Recipe>();
            CreateMap<Models.RecipeDetail, DTO.Drink.RecipeDetail>();
            CreateMap<DTO.Drink.RecipeDetailUpdate, Models.RecipeDetail>(); 
        }
    }
}
