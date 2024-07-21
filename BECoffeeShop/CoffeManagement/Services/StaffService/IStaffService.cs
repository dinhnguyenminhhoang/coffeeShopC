using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Staffs;

namespace CoffeManagement.Services.StaffService
{
    public interface IStaffService
    {
        Task<PagingListModel<StaffsResponse>> GetListStaffs(PagingDTO pagingDto);
        Task<int> CreateStaffs(CreateStaffRequest request);
        Task<int> UpdateStaffs(UpdateStaffsRequest request);
        Task<StaffsDetailResponse> GetStaffsDetail(int id);
        Task<int> DeleteStaffs(int id);

    }
}
