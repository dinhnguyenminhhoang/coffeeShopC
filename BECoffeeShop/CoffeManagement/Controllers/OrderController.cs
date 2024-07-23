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

        //[HttpPost("Staff/Order")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        //[SwaggerOperation(Summary = "Create new order by Staff")]
        //public async Task<IActionResult> StaffCreateOrder([FromBody] StaffCreateOrderRequest request)
        //{
        //    return Ok(RenderSuccessResponse(data: 1));
        //}

        //[HttpPut("Staff/Update")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        //[SwaggerOperation(Summary = "Update order by Staff")]
        //public async Task<IActionResult> StaffUpdateOrder([FromBody] StaffUpdateOrderRequest request)
        //{
        //    return Ok(RenderSuccessResponse(data: 1));
        //}

        //[HttpDelete("Staff/Cancel")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        //[SwaggerOperation(Summary = "Cancel order by Staff")]
        //public async Task<IActionResult> StaffCancelOrder([FromBody] StaffCancelOrderRequest request)
        //{
        //    return Ok(RenderSuccessResponse(data: 1));
        //}

        //[HttpGet("Staff/List")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        //[SwaggerOperation(Summary = "List order of Staff")]
        //public async Task<IActionResult> StaffListOrder([FromQuery] PagingDTO pagingDTO, [FromQuery] ListOrderFilter filter)
        //{
        //    return Ok(RenderSuccessResponse(data: 1));
        //}

        // ---------------------- Staff, Admin ----------------------

        //[HttpGet("List")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        //[SwaggerOperation(Summary = "List order")]
        //public async Task<IActionResult> GetListOrder([FromQuery] PagingDTO pagingDTO, [FromQuery] ListOrderFilter filter)
        //{
        //    return Ok(RenderSuccessResponse(data: 1));
        //}

    }
}
