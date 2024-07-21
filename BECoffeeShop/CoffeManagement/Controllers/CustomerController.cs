using CoffeManagement.DTO.Customers;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Services.CustomersService;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("Customers")]
    [ApiController]
    public class CustomerController : BaseController
    {
        private readonly ICustomerService _customersService;

        public CustomerController(ICustomerService customersService)
        {
            _customersService = customersService;
        }

        [HttpGet]
        // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Get List customers")]
        public async Task<IActionResult> GetListCustomers([FromQuery] PagingDTO pagingDto)
        {
            var result = await _customersService.GetListCustomers(pagingDto);

            return Ok(RenderSuccessResponse(result));
        }
        [HttpGet("{id:int}")]
        // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Get Customers Detail")]
        public async Task<IActionResult> GetCustomersDetail([FromRoute] int id)
        {
            var result = await _customersService.GetCustomersDetail(id);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpPost]
        // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Create new Customer")]
        public async Task<IActionResult> CreateCustomers(CreateCustomerRequest request)
        {
            var result = await _customersService.CreateCustomers(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut]
        // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update Customer")]
        public async Task<IActionResult> UpdateCustomers([FromBody] UpdateCustomerRequest request)
        {
            var result = await _customersService.UpdateCustomers(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpDelete("{id:int}")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Delete Customers")]
        public async Task<IActionResult> DeleteCustomers([FromRoute] int id)
        {
            var result = await _customersService.DeleteCustomers(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
    }
}
