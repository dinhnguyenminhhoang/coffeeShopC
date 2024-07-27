using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Order;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Infrastructure.Jwt;
using CoffeManagement.Models;
using CoffeManagement.Models.Enum;
using CoffeManagement.Repositories.CustomerRepo;
using CoffeManagement.Repositories.OrderRepo;
using CoffeManagement.Repositories.StaffRepo;
using CoffeManagement.Repositories.VoucherRepo;

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
        private readonly IVoucherRepository _voucherRepository;

        public OrderService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository, IStaffRepository staffRepository, ICustomerRepository customerRepository, IVoucherRepository voucherRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _customerRepository = customerRepository;
            _staffRepository = staffRepository;
            _voucherRepository = voucherRepository;
        }

        public async Task<int> CustomerCreateOrder(CustomerCreateOrderRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedCustomer = await _customerRepository.GetByPhone(phone);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            Voucher? existedVoucher = null;
            bool isApplyVoucher = false;
            if (!string.IsNullOrEmpty(request.VoucherCode))
            {
                existedVoucher = await _voucherRepository.GetByCode(request.VoucherCode);
                if (existedVoucher == null) throw new NotFoundException("Not found voucher.");
                if (existedVoucher.Remain <= 0 || existedVoucher.ExpiredAt < DateTime.Now) throw new BadRequestException("Voucher has expired.");
                foreach (var orderDetail in request.OrderDetails)
                {
                    if(existedVoucher.VoucherApplies.Any(va => va.DrinkId == orderDetail.DrinkId)){
                        isApplyVoucher = true;
                        break;
                    }
                }
                if (!isApplyVoucher) throw new BadRequestException("Cannot Apply this Voucher.");
            }

            var order = _mapper.Map<Order>(request);
            order.CustomerId = existedCustomer.Id;
            order.IsPaid = true;
            if (isApplyVoucher)
            {
                order.VoucherId = existedVoucher.Id;
                order.Discount = existedVoucher.Discount;
            }
            await _orderRepository.Add(order);

            existedVoucher.Remain = existedVoucher.Remain - 1;
            await _voucherRepository.Update(existedVoucher);

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

            Voucher? existedVoucher = null;
            bool isApplyVoucher = false;
            if (!string.IsNullOrEmpty(request.VoucherCode))
            {
                existedVoucher = await _voucherRepository.GetByCode(request.VoucherCode);
                if (existedVoucher == null) throw new NotFoundException("Not found voucher.");
                if (existedVoucher.Remain <= 0 || existedVoucher.ExpiredAt < DateTime.Now) throw new BadRequestException("Voucher has expired.");
                foreach (var orderDetail in request.OrderDetails)
                {
                    if (existedVoucher.VoucherApplies.Any(va => va.DrinkId == orderDetail.DrinkId))
                    {
                        isApplyVoucher = true;
                        break;
                    }
                }
                if (!isApplyVoucher) throw new BadRequestException("Cannot Apply this Voucher.");
            }

            var order = _mapper.Map<Order>(request);
            order.StaffId = existedStaff.Id;
            if (isApplyVoucher)
            {
                order.VoucherId = existedVoucher.Id;
                order.Discount = existedVoucher.Discount;
            }

            await _orderRepository.Add(order);

            existedVoucher.Remain = existedVoucher.Remain - 1;
            await _voucherRepository.Update(existedVoucher);

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

            Voucher? existedVoucher = null;
                bool isApplyVoucher = false;
            if (!string.IsNullOrEmpty(request.VoucherCode))
            {
                existedVoucher = await _voucherRepository.GetByCode(request.VoucherCode);
                if (existedVoucher == null) throw new NotFoundException("Not found voucher.");
                if (existedVoucher.Remain <= 0 || existedVoucher.ExpiredAt < DateTime.Now) throw new BadRequestException("Voucher has expired.");
                foreach (var orderDetail in request.OrderDetails)
                {
                    if (existedVoucher.VoucherApplies.Any(va => va.DrinkId == orderDetail.DrinkId))
                    {
                        isApplyVoucher = true;
                        break;
                    }
                }
                if (!isApplyVoucher) throw new BadRequestException("Cannot Apply this Voucher.");
            }

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
            if (isApplyVoucher)
            {
                existedOrder.VoucherId = existedVoucher.Id;
                existedOrder.Discount = existedVoucher.Discount;
            }
            await _orderRepository.Update(existedOrder);

            existedVoucher.Remain = existedVoucher.Remain - 1;
            await _voucherRepository.Update(existedVoucher);

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

        public async Task<int> StaffComfirmlOrder(int id)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var existedOrder = await _orderRepository.GetById(id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (!existedOrder.Status.Equals(OrderStatus.ODR_INIT.ToString())) throw new ConflictException("Cannot Comfirm Order");
            if (existedOrder.OrderDetails.Any(od => od.Drink.IsDeleted == true || od.DrinkSize.IsDeleted == true)) throw new ConflictException("Cannot Comfirm Order. Some Drink or Size is deleted");


            foreach (var orderDetail in existedOrder.OrderDetails.ToList())
            {
                var recipe = orderDetail.Drink.Recipes?.FirstOrDefault();
                double ingredientCostStandard = 0;

                if (recipe != null)
                {
                    foreach (var recipeDetails in recipe.RecipeDetails.ToList())
                    {
                        var amountNeeded = recipeDetails.Amount * orderDetail.Quantity;
                        var ingredientStock = recipeDetails
                            .Ingredient.IngredientStocks
                            .Where(ings => ings.Remain >= amountNeeded)
                            .OrderBy(ings => ings.ExpiredAt)
                            .FirstOrDefault();

                        if (ingredientStock == null) throw new ConflictException("Not enough ingredient");

                        var RatioOfCostAndAmount = ingredientStock.Cost / ingredientStock.Amount;
                        ingredientCostStandard += RatioOfCostAndAmount * amountNeeded;

                        ingredientStock.Remain -= amountNeeded;
                    }
                }

                orderDetail.IngredientCost = orderDetail.DrinkSize.Ratio * ingredientCostStandard;
            }

            existedOrder.Status = OrderStatus.ODR_COMF.ToString();
            existedOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.Update(existedOrder);

            return existedOrder.Id;
        }

        public async Task<int> StaffServedOrder(int id)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var existedOrder = await _orderRepository.GetById(id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (!existedOrder.Status.Equals(OrderStatus.ODR_COMF.ToString())) throw new ConflictException("Cannot Served Order");

            existedOrder.Status = OrderStatus.ODR_SERV.ToString();
            existedOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.Update(existedOrder);

            return existedOrder.Id;
        }

        public async Task<int> StaffShippingOrder(int id)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var existedOrder = await _orderRepository.GetById(id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (!(existedOrder.IsPaid ?? false)) throw new ConflictException("Cannot Ship Order");

            existedOrder.Status = OrderStatus.ODR_SHIP.ToString();
            existedOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.Update(existedOrder);

            return existedOrder.Id;
        }

        public async Task<int> StaffShippedOrder(int id)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var existedOrder = await _orderRepository.GetById(id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (!existedOrder.Status.Equals(OrderStatus.ODR_SHIP.ToString())) throw new ConflictException("Cannot Shipped Order");

            existedOrder.Status = OrderStatus.ODR_SHIPED.ToString();
            existedOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.Update(existedOrder);

            return existedOrder.Id;
        }

        public async Task<int> StaffCompletedOrder(int id)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var existedOrder = await _orderRepository.GetById(id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (!(existedOrder.Status.Equals(OrderStatus.ODR_SERV.ToString()) || existedOrder.Status.Equals(OrderStatus.ODR_SHIPED.ToString()))) throw new ConflictException("Cannot Completed Order");

            existedOrder.Status = OrderStatus.ODR_COML.ToString();
            existedOrder.IsPaid = true;
            existedOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.Update(existedOrder);

            return existedOrder.Id;
        }

        public async Task<int> StaffFailedOrder(StaffFailedOrderRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;
            var existedStaff = await _staffRepository.GetByPhone(phone);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");

            var existedOrder = await _orderRepository.GetById(request.Id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");
            if (existedOrder.Status.Equals(OrderStatus.ODR_INIT.ToString()) || existedOrder.Status.Equals(OrderStatus.ODR_COML.ToString())) throw new ConflictException("Cannot Shipped Order");

            existedOrder.Status = OrderStatus.ODR_FAIL.ToString();
            existedOrder.FailedComment = request.FailedComment;
            existedOrder.UpdatedAt = DateTime.Now;

            await _orderRepository.Update(existedOrder);

            return existedOrder.Id;
        }

        public async Task<StaffOrderDetailResponse> StaffOrderDetail(int id)
        {
            var existedOrder = await _orderRepository.GetById(id);
            if (existedOrder == null) throw new NotFoundException("Not found Order");

            var orderDetail = _mapper.Map<StaffOrderDetailResponse>(existedOrder);

            return orderDetail;
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
