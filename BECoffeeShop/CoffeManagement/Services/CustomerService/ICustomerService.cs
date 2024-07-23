using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Account;
using CoffeManagement.DTO.Customer;
using CoffeManagement.DTO.Paging;

namespace CoffeManagement.Services.CustomerService
{
    public interface ICustomerService
    {
        Task<PagingListModel<CustomersResponse>> GetListCustomer(PagingDTO pagingDto);
        Task<int> CreateCustomer(CreateCustomerRequest request);
        Task<int> UpdateCustomer(UpdateCustomerRequest request);
        Task<CustomersDetailResponse> GetCustomerDetail(int id);
        Task<int> DeleteCustomer(int id);
        Task<int> AddAccountForCustomers(CreateAccountForCustomerRequest request);
        Task<int> UpdateAccountOfCustomers(UpdateAccountOfCustomerRequest request);
        Task<CustomersDetailResponse> GetProfileCustomer();
        Task<int> UpdateProfileCustomer(UpdateProfileCustomerRequest request);
        Task<int> CustomerChangePassword(CustomerChangePasswordRequest request);
    }
}
