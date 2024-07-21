using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Staffs;

namespace CoffeManagement.Services.StaffService
{
    public interface IStaffService
    {
        Task<PagingListModel<StaffsResponse>> GetListStaff(PagingDTO pagingDto);
        Task<int> CreateStaff(CreateStaffRequest request);
        Task<int> UpdateStaff(UpdateStaffsRequest request);
        Task<StaffsDetailResponse> GetStaffDetail(int id);
        Task<int> DeleteStaff(int id);

    }
}
