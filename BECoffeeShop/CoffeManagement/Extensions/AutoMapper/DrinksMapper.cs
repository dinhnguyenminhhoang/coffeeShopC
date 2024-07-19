using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadDrinksMapperProfile()
        {
            CreateMap<CoffeManagement.Models.Drinks, CoffeManagement.DTO.Drinks.DrinksResponse>();
            CreateMap<CoffeManagement.Models.Drinks, CoffeManagement.DTO.Drinks.DrinksDetailResponse>();
            CreateMap<CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.Models.Drinks>, CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.DTO.Drinks.DrinksResponse>>();
            CreateMap<CoffeManagement.DTO.Drinks.CreateDrinksRequest, CoffeManagement.Models.Drinks>();
            CreateMap<CoffeManagement.DTO.Drinks.UpdateDrinksRequest, CoffeManagement.Models.Drinks>();
            CreateMap<CoffeManagement.Models.DrinksSize, CoffeManagement.DTO.Drinks.DrinksSize>();
            CreateMap<CoffeManagement.DTO.Drinks.DrinksSizeCreate, CoffeManagement.Models.DrinksSize>();
            CreateMap<CoffeManagement.DTO.Drinks.CreateDrinksSizeRequest, CoffeManagement.Models.DrinksSize>();
            CreateMap<CoffeManagement.DTO.Drinks.UpdateDrinksSizeRequest, CoffeManagement.Models.DrinksSize>();
        }
    }
}
