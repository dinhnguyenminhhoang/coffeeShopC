using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Order;
using CoffeManagement.DTO.Paging;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.OrderService
{
    public interface IOrderService
    {
        Task<int> CustomerCreateOrder(CustomerCreateOrderRequest request);
        Task<int> CustomerCancelOrder(CustomerCancelOrderRequest request);
        Task<PagingListModel<CustomerOrderHistoryResponse>> CustomerOrderHistory(PagingDTO pagingDTO, ListOrderFilter filter);
        Task<CustomerOrderDetailResponse> CustomerOrderDetail(int id);
    }
}
