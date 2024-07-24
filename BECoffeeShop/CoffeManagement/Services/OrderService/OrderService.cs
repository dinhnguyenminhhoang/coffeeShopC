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
using CoffeManagement.Repositories.StaffRepo;
using Newtonsoft.Json.Linq;

namespace CoffeManagement.Services.OrderService
{
    public class OrderService : IOrderService
    {

        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly ICustomerRepository _customerRepository;
        private readonly IStaffRepository _staffRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;

        public OrderService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository, IStaffRepository staffRepository, ICustomerRepository customerRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _customerRepository = customerRepository;
            _staffRepository = staffRepository;
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

        public async Task<int> StaffCreateOrder(StaffCreateOrderRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var order = _mapper.Map<Order>(request);
            order.StaffId = existedStaff.Id;

            await _orderRepository.Add(order);

            return order.Id;
        }

        public async Task<int> StaffUpdateOrder(StaffUpdateOrderRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var existedOrder = await _orderRepository.GetById(request.Id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (!existedOrder.Status.Equals(OrderStatus.ODR_INIT.ToString())) throw new ConflictException("Cannot Update Order");


            foreach (var orderDetail in request.OrderDetails)
            {
                var orderDetailExist = (await _orderDetailRepository.Where(od => od.OrderId == existedOrder.Id && od.DrinkId == orderDetail.DrinkId && od.DrinkSizeId == orderDetail.DrinkSizeId)).FirstOrDefault();
                if (orderDetailExist == null)
                {
                    var orderDetailNew = _mapper.Map<Models.OrderDetail>(orderDetail);
                    orderDetailNew.OrderId = request.Id;
                    await _orderDetailRepository.Add(orderDetailNew);
                }
                else
                {
                    _mapper.Map(orderDetail, orderDetailExist);
                    await _orderDetailRepository.Update(orderDetailExist);
                }
            }


            foreach (var orderDetail in existedOrder.OrderDetails.ToList())
            {
                if (!request.OrderDetails.Any(od => od.DrinkId == orderDetail.DrinkId && od.DrinkSizeId == orderDetail.DrinkSizeId))
                {
                    await _orderDetailRepository.Remove(orderDetail.Id);
                }
            }

            _mapper.Map(request, existedOrder);
            existedOrder.TotalPrice = existedOrder.OrderDetails.Sum(od => od.Price);
            await _orderRepository.Update(existedOrder);

            return existedOrder.Id;
        }

        public async Task<int> StaffCancelOrder(StaffCancelOrderRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var existedOrder = await _orderRepository.GetById(request.Id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (!existedOrder.Status.Equals(OrderStatus.ODR_INIT.ToString())) throw new ConflictException("Cannot Cancel Order");

            existedOrder.Status = OrderStatus.ODR_CANL.ToString();
            existedOrder.StaffCanceledId = existedStaff.Id;
            existedOrder.CanceledNote = request.CancelComment;
            existedOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.Update(existedOrder);

            return existedOrder.Id;
        }

        public async Task<PagingListModel<StaffOrderResponse>> StaffOrderList(PagingDTO pagingDTO, ListOrderFilter filter)
        {

            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var orderQeryable = _orderRepository.GetQueryable().Where(o => o.StaffId == existedStaff.Id);

            if (filter != null && !string.IsNullOrEmpty(filter.Status))
            {
                if (Enum.IsDefined(typeof(OrderStatus), filter.Status!))
                {
                    orderQeryable = orderQeryable.Where(o => o.Status.Equals(filter.Status!));
                }
            }

            var pagingList = new PagingListModel<Order>(orderQeryable, pagingDTO.PageIndex, pagingDTO.PageSize);

            var result = _mapper.Map<PagingListModel<StaffOrderResponse>>(pagingList);

            return result;
        }
        
        public async Task<PagingListModel<StaffOrderResponse>> StaffOrderListAll(PagingDTO pagingDTO, ListOrderFilter filter)
        {

            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var orderQeryable = _orderRepository.GetQueryable();

            if (filter != null && !string.IsNullOrEmpty(filter.Status))
            {
                if (Enum.IsDefined(typeof(OrderStatus), filter.Status!))
                {
                    orderQeryable = orderQeryable.Where(o => o.Status.Equals(filter.Status!));
                }
            }

            var pagingList = new PagingListModel<Order>(orderQeryable, pagingDTO.PageIndex, pagingDTO.PageSize);

            var result = _mapper.Map<PagingListModel<StaffOrderResponse>>(pagingList);

            return result;
        }

    }
}
