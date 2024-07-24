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

        // ---------------------------------

        Task<int> StaffCreateOrder(StaffCreateOrderRequest request);
        Task<int> StaffUpdateOrder(StaffUpdateOrderRequest request);
        Task<int> StaffCancelOrder(StaffCancelOrderRequest request);
        Task<PagingListModel<StaffOrderResponse>> StaffOrderList(PagingDTO pagingDTO, ListOrderFilter filter);
        Task<PagingListModel<StaffOrderResponse>> StaffOrderListAll(PagingDTO pagingDTO, ListOrderFilter filter);
    }
}
