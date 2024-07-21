using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadDrinkMapperProfile()
        {
            CreateMap<CoffeManagement.Models.Drink, CoffeManagement.DTO.Drink.DrinkResponse>();
            CreateMap<CoffeManagement.Models.Drink, CoffeManagement.DTO.Drink.DrinkDetailResponse>();
            CreateMap<CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.Models.Drink>, CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.DTO.Drink.DrinkResponse>>();
            CreateMap<CoffeManagement.DTO.Drink.CreateDrinkRequest, CoffeManagement.Models.Drink>();
            CreateMap<CoffeManagement.DTO.Drink.UpdateDrinkRequest, CoffeManagement.Models.Drink>();
            CreateMap<CoffeManagement.Models.DrinkSize, CoffeManagement.DTO.Drink.DrinkSize>();
            CreateMap<CoffeManagement.DTO.Drink.DrinkSizeCreate, CoffeManagement.Models.DrinkSize>();
            CreateMap<CoffeManagement.DTO.Drink.CreateDrinkSizeRequest, CoffeManagement.Models.DrinkSize>();
            CreateMap<CoffeManagement.DTO.Drink.UpdateDrinkSizeRequest, CoffeManagement.Models.DrinkSize>();
        }
    }
}
