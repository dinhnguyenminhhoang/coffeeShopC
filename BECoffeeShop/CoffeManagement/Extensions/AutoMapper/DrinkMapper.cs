using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadDrinkMapperProfile()
        {
            CreateMap<Models.Drink, DTO.Drink.DrinkResponse>()
                .ForMember(dest => dest.CategoryName, otp => otp.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.AverageRating, otp => otp.MapFrom(src => src.DrinkRatings.Count() != 0 ? src.DrinkRatings.Average(dr => dr.Rating) : 0))
                .ForMember(dest => dest.MinPrice, otp => otp.MapFrom(src => src.DrinkSizes.OrderBy(ds => ds.Price).FirstOrDefault().Price));
            CreateMap<Models.Drink, DTO.Drink.DrinkDetailResponse>()
                .ForMember(dest => dest.Category, otp => otp.MapFrom(src => src.Category))
                .ForMember(dest => dest.AverageRating, otp => otp.MapFrom(src => src.DrinkRatings.Count() != 0 ? src.DrinkRatings.Average(dr => dr.Rating) : 0))
                .ForMember(dest => dest.DrinksSizes, otp => otp.MapFrom(src => src.DrinkSizes.AsEnumerable()))
                .ForMember(dest => dest.Recipe, otp => otp.MapFrom(src => src.Recipes.FirstOrDefault()));
            CreateMap<Common.Pagging.PagingListModel<Models.Drink>, Common.Pagging.PagingListModel<DTO.Drink.DrinkResponse>>();
            CreateMap<DTO.Drink.CreateDrinkRequest, Models.Drink>();
            CreateMap<DTO.Drink.UpdateDrinkRequest, Models.Drink>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Models.DrinkSize, DTO.Drink.DrinkSize>();
            CreateMap<DTO.Drink.DrinkSizeCreate, Models.DrinkSize>();
            CreateMap<DTO.Drink.CreateDrinkSizeRequest, Models.DrinkSize>();
            CreateMap<DTO.Drink.UpdateDrinkSizeRequest, Models.DrinkSize>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Models.Category, DTO.Drink.Category>();
        }
    }
}
