using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadCustomerMapperProfile()
        {
            CreateMap<Models.Customer, DTO.Customer.CustomersResponse>();
            CreateMap<Models.Customer, DTO.Customer.CustomersDetailResponse>();
            CreateMap<Common.Pagging.PagingListModel<Models.Customer>, Common.Pagging.PagingListModel<DTO.Customer.CustomersResponse>>();
            CreateMap<DTO.Customer.CreateCustomerRequest, Models.Customer>();
            CreateMap<DTO.Customer.UpdateCustomerRequest, Models.Customer>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<DTO.Customer.UpdateProfileCustomerRequest, Models.Customer>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
