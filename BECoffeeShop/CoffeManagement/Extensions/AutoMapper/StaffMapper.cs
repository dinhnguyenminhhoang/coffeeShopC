using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadStaffMapperProfile()
        {
            CreateMap<Models.Staff, DTO.Staffs.StaffsResponse>();
            CreateMap<Models.Staff, DTO.Staffs.StaffsDetailResponse>();
            CreateMap<Common.Pagging.PagingListModel<Models.Staff>, Common.Pagging.PagingListModel<DTO.Staffs.StaffsResponse>>();
            CreateMap<DTO.Staffs.CreateStaffRequest, Models.Staff>();
            CreateMap<DTO.Staffs.UpdateStaffsRequest, Models.Staff>();
        }
    }
}
