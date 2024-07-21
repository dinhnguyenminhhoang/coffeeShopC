using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile :Profile
    {
        private void LoadBrachMapperProfile()
        {
            CreateMap<Models.Branch, DTO.Branches.BranchesResponse>();
            CreateMap<Models.Branch, DTO.Branches.BranchesDetailReponse>();
            CreateMap<Common.Pagging.PagingListModel<Models.Branch>, Common.Pagging.PagingListModel<DTO.Branches.BranchesResponse>>();
            CreateMap<DTO.Branches.CreateBranchesRequest, Models.Branch>();
            CreateMap<DTO.Branches.UpdateBranchesRequest, Models.Branch>();
        }
    }
}
