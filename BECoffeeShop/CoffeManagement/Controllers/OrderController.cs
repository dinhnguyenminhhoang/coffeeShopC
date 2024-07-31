using CoffeManagement.DTO.Order;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models.Enum;
using CoffeManagement.Services.OrderService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("Orders")]
    [ApiController]
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // ---------------------- Customer ----------------------

        [HttpPost("Cusotmer/Order")]
        [Authorize(Policy = nameof(AuthPolicy.POL_CUSTOMER))]
        [SwaggerOperation(Summary = "Create new order by Customer")]
        public async Task<IActionResult> CustomerCreateOrder([FromBody] CustomerCreateOrderRequest request)
        {
            var result = await _orderService.CustomerCreateOrder(request); 

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpGet("Cusotmer/History")]
        [Authorize(Policy = nameof(AuthPolicy.POL_CUSTOMER))]
        [SwaggerOperation(Summary = "Order history of Customer")]
        public async Task<IActionResult> CustomerOrderHistory([FromQuery] PagingDTO pagingDTO, [FromQuery] ListOrderFilter filter)
        {
            var result = await _orderService.CustomerOrderHistory(pagingDTO, filter);

            return Ok(RenderSuccessResponse(data: result));
        }


        [HttpGet("Cusotmer/Detail/{id:int}")]
        [Authorize(Policy = nameof(AuthPolicy.POL_CUSTOMER))]
        [SwaggerOperation(Summary = "Order Detail of Customer")]
        public async Task<IActionResult> CustomerOrderDetail([FromRoute] int id)
        {
            var result =  await _orderService.CustomerOrderDetail(id);

            return Ok(RenderSuccessResponse(data: result));
        }


        [HttpDelete("Cusotmer/Cancel")]
        [Authorize(Policy = nameof(AuthPolicy.POL_CUSTOMER))]
        [SwaggerOperation(Summary = "Customer Cancel Order")]
        public async Task<IActionResult> CustomerCancelOrder([FromBody] CustomerCancelOrderRequest request)
        {
            var result =  await _orderService.CustomerCancelOrder(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }


        //---------------------- Staff ----------------------

        [HttpPost("Staff/Order")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Create new order by Staff")]
        public async Task<IActionResult> StaffCreateOrder([FromBody] StaffCreateOrderRequest request)
        {
            var result = await _orderService.StaffCreateOrder(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut("Staff/Update")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Update order by Staff (only order in status INIT)")]
        public async Task<IActionResult> StaffUpdateOrder([FromBody] StaffUpdateOrderRequest request)
        {
            var result = await _orderService.StaffUpdateOrder(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPost("Staff/Comfirm/{id:int}")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Conmfirm order by Staff")]
        public async Task<IActionResult> StaffComfirmOrder([FromRoute] int id)
        {
            var result = await _orderService.StaffComfirmlOrder(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
        
        [HttpPost("Staff/Served/{id:int}")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Served order by Staff")]
        public async Task<IActionResult> StaffServedOrder([FromRoute] int id)
        {
            var result = await _orderService.StaffServedOrder(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
        
        [HttpPost("Staff/Shipping/{id:int}")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Shipping order by Staff")]
        public async Task<IActionResult> StaffShippingOrder([FromRoute] int id)
        {
            var result = await _orderService.StaffShippingOrder(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
        
        [HttpPost("Staff/Shipped/{id:int}")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Shipped order by Staff")]
        public async Task<IActionResult> StaffShippedOrder([FromRoute] int id)
        {
            var result = await _orderService.StaffShippedOrder(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
        
        [HttpPost("Staff/Completed/{id:int}")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Completed order by Staff (affter paid)")]
        public async Task<IActionResult> StaffCompletedOrder([FromRoute] int id)
        {
            var result = await _orderService.StaffCompletedOrder(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPost("Staff/Failed")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Failed order by Staff")]
        public async Task<IActionResult> StaffFailedOrder([FromBody] StaffFailedOrderRequest request)
        {
            var result = await _orderService.StaffFailedOrder(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
        
        [HttpDelete("Staff/Cancel")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Cancel order by Staff")]
        public async Task<IActionResult> StaffCancelOrder([FromBody] StaffCancelOrderRequest request)
        {
            var result = await _orderService.StaffCancelOrder(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpGet("Staff/Detail/{id:int}")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Order Detail of Staff")]
        public async Task<IActionResult> StaffOrderDetail([FromRoute] int id)
        {
            var result = await _orderService.StaffOrderDetail(id);

            return Ok(RenderSuccessResponse(data: result));
        }

        [HttpGet("Staff/List")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "List order of Staff")]
        public async Task<IActionResult> StaffListOrder([FromQuery] PagingDTO pagingDTO, [FromQuery] ListOrderFilter filter)
        {
            var result = await _orderService.StaffOrderList(pagingDTO, filter);

            return Ok(RenderSuccessResponse(data: result));
        }

        // ---------------------- Staff, Admin ----------------------

        [HttpGet("List")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "List all order")]
        public async Task<IActionResult> GetListOrder([FromQuery] PagingDTO pagingDTO, [FromQuery] ListOrderFilter filter)
        {
            var result = await _orderService.StaffOrderListAll(pagingDTO, filter);

            return Ok(RenderSuccessResponse(data: result));
        }

    }
}
