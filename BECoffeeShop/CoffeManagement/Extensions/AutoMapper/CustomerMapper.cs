using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadCustomerMapperProfile()
        {
            CreateMap<Models.Customer, DTO.Customers.CustomersResponse>();
            CreateMap<Models.Customer, DTO.Customers.CustomersDetailResponse>();
            CreateMap<Common.Pagging.PagingListModel<Models.Customer>, Common.Pagging.PagingListModel<DTO.Customers.CustomersResponse>>();
            CreateMap<DTO.Customers.CreateCustomerRequest, Models.Customer>();
            CreateMap<DTO.Customers.UpdateCustomerRequest, Models.Customer>();
        }
    }
}
