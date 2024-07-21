using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile :Profile
    {
        private void LoadBrachMapperProfile()
        {
            CreateMap<CoffeManagement.Models.Branch, CoffeManagement.DTO.Branches.BranchesResponse>();
            CreateMap<CoffeManagement.Models.Branch, CoffeManagement.DTO.Branches.BranchesDetailReponse>();
            CreateMap<CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.Models.Branch>, CoffeManagement.Common.Pagging.PagingListModel<CoffeManagement.DTO.Branches.BranchesResponse>>();
            CreateMap<CoffeManagement.DTO.Branches.CreateBranchesRequest, CoffeManagement.Models.Branch>();
            CreateMap<CoffeManagement.DTO.Branches.UpdateBranchesRequest, CoffeManagement.Models.Branch>();
        }
    }
}
