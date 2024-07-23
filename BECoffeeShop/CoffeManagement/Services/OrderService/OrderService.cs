using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Customer;
using CoffeManagement.DTO.Order;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Infrastructure.Jwt;
using CoffeManagement.Models;
using CoffeManagement.Models.Enum;
using CoffeManagement.Repositories.CustomerRepo;
using CoffeManagement.Repositories.OrderRepo;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace CoffeManagement.Services.OrderService
{
    public class OrderService : IOrderService
    {

        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly ICustomerRepository _customerRepository;
        private readonly IOrderRepository _orderRepository;

        public OrderService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IOrderRepository orderRepository, ICustomerRepository customerRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _orderRepository = orderRepository;
            _customerRepository = customerRepository;
        }

        public async Task<int> CustomerCreateOrder(CustomerCreateOrderRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedCustomer = await _customerRepository.GetByPhone(phone);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            var order = _mapper.Map<Order>(request);
            order.CustomerId = existedCustomer.Id;

            await _orderRepository.Add(order);

            return order.Id;
        }
        
        public async Task<int> CustomerCancelOrder(CustomerCancelOrderRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedCustomer = await _customerRepository.GetByPhone(phone);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            var existedOrder = await _orderRepository.GetById(request.Id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (existedOrder.CustomerId != existedCustomer.Id) throw new BadRequestException("Order does not belong to this Customer");
 
            existedOrder.Status = OrderStatus.ODR_CANL.ToString();
            existedOrder.CanceledNote = request.CancelComment;
            existedOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.Update(existedOrder);

            return existedOrder.Id;
        }

        public async Task<PagingListModel<CustomerOrderHistoryResponse>> CustomerOrderHistory(PagingDTO pagingDTO, ListOrderFilter filter)
        {

            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedCustomer = await _customerRepository.GetByPhone(phone);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            var orderQeryable = _orderRepository.GetQueryable().Where(o => o.CustomerId == existedCustomer.Id);

            if (filter?.Status?.Equals(CustomerOrderStatus.ODR_ORDERED.ToString()) ?? false)
            {
                orderQeryable = orderQeryable.Where(o => o.Status.Equals(OrderStatus.ODR_INIT.ToString()) || o.Status.Equals(OrderStatus.ODR_COMF.ToString()));
            }
            else if (filter?.Status?.Equals(CustomerOrderStatus.ODR_SHIP.ToString()) ?? false)
            {
                orderQeryable = orderQeryable.Where(o => o.Status.Equals(OrderStatus.ODR_SHIP.ToString()) || o.Status.Equals(OrderStatus.ODR_SHIPED.ToString()));
            }
            else if (filter?.Status?.Equals(CustomerOrderStatus.ODR_COML.ToString()) ?? false)
            {
                orderQeryable = orderQeryable.Where(o => o.Status.Equals(OrderStatus.ODR_COML.ToString()));
            }
            else if (filter?.Status?.Equals(CustomerOrderStatus.ODR_CANL.ToString()) ?? false)
            {
                orderQeryable = orderQeryable.Where(o => o.Status.Equals(OrderStatus.ODR_CANL.ToString()));
            }
            else if (filter?.Status?.Equals(CustomerOrderStatus.ODR_FAIL.ToString()) ?? false)
            {
                orderQeryable = orderQeryable.Where(o => o.Status.Equals(OrderStatus.ODR_FAIL.ToString()));
            }

            var pagingList = new PagingListModel<Order>(orderQeryable, pagingDTO.PageIndex, pagingDTO.PageSize);

            var result = _mapper.Map<PagingListModel<CustomerOrderHistoryResponse>>(pagingList);

            return result;
        }

        public async Task<CustomerOrderDetailResponse> CustomerOrderDetail(int id)
        {
            var existedOrder = await _orderRepository.GetById(id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");

            var orderDetail = _mapper.Map<CustomerOrderDetailResponse>(existedOrder);
            
            return orderDetail;
        }
    }
}
