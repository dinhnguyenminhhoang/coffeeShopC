using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Branches;
using CoffeManagement.DTO.Paging;

namespace CoffeManagement.Services.BrachesService
{
    public interface IBranchesSevice
    {
        Task<PagingListModel<BranchesResponse>> GetListBranches(PagingDTO pagingDto);
        Task<int> CreateBranches(CreateBranchesRequest request);
        Task<int> UpdateBranches(UpdateBranchesRequest request);
        Task<BranchesDetailReponse> GetBranchesDetail(int id);
        Task<int> DeleteBranches(int id);
    }
}
