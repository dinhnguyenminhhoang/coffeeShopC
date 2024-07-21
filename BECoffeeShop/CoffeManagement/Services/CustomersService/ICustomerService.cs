using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Customers;
using CoffeManagement.DTO.Paging;

namespace CoffeManagement.Services.CustomersService
{
    public interface ICustomerService
    {
        Task<PagingListModel<CustomersResponse>> GetListCustomers(PagingDTO pagingDto);
        Task<int> CreateCustomers(CreateCustomerRequest request);
        Task<int> UpdateCustomers(UpdateCustomerRequest request);
        Task<CustomersDetailResponse> GetCustomersDetail(int id);
        Task<int> DeleteCustomers(int id);
    }
}
