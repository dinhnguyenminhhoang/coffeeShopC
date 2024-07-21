using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadStaffMapperProfile()
        {
            CreateMap<CoffeManagement.Models.Staff, CoffeManagement.DTO.Staffs.StaffsResponse>();
            CreateMap<CoffeManagement.Models.Staff, CoffeManagement.DTO.Staffs.StaffsDetailResponse>();
            CreateMap<CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.Models.Staff>, CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.DTO.Staffs.StaffsResponse>>();
            CreateMap<CoffeManagement.DTO.Staffs.CreateStaffRequest, CoffeManagement.Models.Staff>();
            CreateMap<CoffeManagement.DTO.Staffs.UpdateStaffsRequest, CoffeManagement.Models.Staff>();
        }
    }
}
