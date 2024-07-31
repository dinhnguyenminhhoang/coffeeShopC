using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Customer;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Staff;

namespace CoffeManagement.Services.StaffService
{
    public interface IStaffService
    {
        Task<PagingListModel<StaffsResponse>> GetListStaff(PagingDTO pagingDto);
        Task<int> CreateStaff(CreateStaffRequest request);
        Task<int> UpdateStaff(UpdateStaffsRequest request);
        Task<StaffsDetailResponse> GetStaffDetail(int id);
        Task<int> DeleteStaff(int id);
        Task<int> AddAccountForStaff(CreateAccountForStaffRequest request);
        Task<int> UpdateAccountOfStaff(UpdateAccountOfStaffRequest request);
    }
}
