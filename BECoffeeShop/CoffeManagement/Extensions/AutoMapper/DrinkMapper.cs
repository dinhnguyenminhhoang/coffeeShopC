using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadDrinkMapperProfile()
        {
            CreateMap<Models.Drink, DTO.Drink.DrinkResponse>();
            CreateMap<Models.Drink, DTO.Drink.DrinkDetailResponse>()
                .ForMember(dest => dest.DrinksSizes, otp => otp.MapFrom(src => src.DrinkSizes.AsEnumerable()));
            CreateMap<Common.Pagging.PagingListModel<Models.Drink>, Common.Pagging.PagingListModel<DTO.Drink.DrinkResponse>>();
            CreateMap<DTO.Drink.CreateDrinkRequest, Models.Drink>();
            CreateMap<DTO.Drink.UpdateDrinkRequest, Models.Drink>();
            CreateMap<Models.DrinkSize, DTO.Drink.DrinkSize>();
            CreateMap<DTO.Drink.DrinkSizeCreate, Models.DrinkSize>();
            CreateMap<DTO.Drink.CreateDrinkSizeRequest, Models.DrinkSize>();
            CreateMap<DTO.Drink.UpdateDrinkSizeRequest, Models.DrinkSize>();
        }
    }
}
