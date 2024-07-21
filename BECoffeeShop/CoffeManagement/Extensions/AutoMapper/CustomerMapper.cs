using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadCustomerMapperProfile()
        {
            CreateMap<CoffeManagement.Models.Customer, CoffeManagement.DTO.Customers.CustomersResponse>();
            CreateMap<CoffeManagement.Models.Customer, CoffeManagement.DTO.Customers.CustomersDetailResponse>();
            CreateMap<CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.Models.Customer>, CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.DTO.Customers.CustomersResponse>>();
            CreateMap<CoffeManagement.DTO.Customers.CreateCustomerRequest, CoffeManagement.Models.Customer>();
            CreateMap<CoffeManagement.DTO.Customers.UpdateCustomerRequest, CoffeManagement.Models.Customer>();
        }
    }
}
