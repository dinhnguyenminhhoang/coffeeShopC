using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadAccountMapperProfile()
        {
            CreateMap<Models.Account, DTO.Account.AccountResponse>();
            CreateMap<DTO.Account.CreateAccountRequest, Models.Account>();
            CreateMap<DTO.Customer.UpdateAccountOfCustomerRequest, Models.Account>();
            CreateMap<DTO.Staff.UpdateAccountOfStaffRequest, Models.Account>();
        }
    }
}
