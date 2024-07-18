using AutoMapper;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Drinks;
using CoffeManagement.Models;
using System.Net;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadDrinksMapperProfile()
        {
            CreateMap<Drinks, DrinksResponse>();
            CreateMap<PagingListModel<Drinks>, PagingListModel<DrinksResponse>>();
            CreateMap<CreateDrinksRequest, Drinks>();
        }
    }
}
