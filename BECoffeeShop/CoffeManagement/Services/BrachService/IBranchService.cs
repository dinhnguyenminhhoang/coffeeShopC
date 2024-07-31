using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Branch;
using CoffeManagement.DTO.Paging;

namespace CoffeManagement.Services.BrachService
{
    public interface IBranchService
    {
        Task<PagingListModel<BranchesResponse>> GetListBranches(PagingDTO pagingDto);
        Task<int> CreateBranches(CreateBranchesRequest request);
        Task<int> UpdateBranches(UpdateBranchesRequest request);
        Task<BranchesDetailReponse> GetBranchesDetail(int id);
        Task<int> DeleteBranches(int id);
    }
}
