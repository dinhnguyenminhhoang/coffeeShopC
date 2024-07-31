using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile :Profile
    {
        private void LoadBrachMapperProfile()
        {
            CreateMap<Models.Branch, DTO.Branch.BranchesResponse>();
            CreateMap<Models.Branch, DTO.Branch.BranchesDetailReponse>();
            CreateMap<Common.Pagging.PagingListModel<Models.Branch>, Common.Pagging.PagingListModel<DTO.Branch.BranchesResponse>>();
            CreateMap<DTO.Branch.CreateBranchesRequest, Models.Branch>();
            CreateMap<DTO.Branch.UpdateBranchesRequest, Models.Branch>();
        }
    }
}
