using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadStaffMapperProfile()
        {
            CreateMap<Models.Staff, DTO.Staff.StaffsResponse>();
            CreateMap<Models.Staff, DTO.Staff.StaffsDetailResponse>();
            CreateMap<Common.Pagging.PagingListModel<Models.Staff>, Common.Pagging.PagingListModel<DTO.Staff.StaffsResponse>>();
            CreateMap<DTO.Staff.CreateStaffRequest, Models.Staff>();
            CreateMap<DTO.Staff.UpdateStaffsRequest, Models.Staff>();
        }
    }
}
