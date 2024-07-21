using CoffeManagement.DTO.Customer;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Services.CustomerService;
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
        public async Task<IActionResult> GetListCustomer([FromQuery] PagingDTO pagingDto)
        {
            var result = await _customersService.GetListCustomer(pagingDto);

            return Ok(RenderSuccessResponse(result));
        }
        [HttpGet("{id:int}")]
        // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Get Customers Detail")]
        public async Task<IActionResult> GetCustomerDetail([FromRoute] int id)
        {
            var result = await _customersService.GetCustomerDetail(id);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpPost]
        // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Create new Customer")]
        public async Task<IActionResult> CreateCustomer(CreateCustomerRequest request)
        {
            var result = await _customersService.CreateCustomer(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut]
        // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update Customer")]
        public async Task<IActionResult> UpdateCustomer([FromBody] UpdateCustomerRequest request)
        {
            var result = await _customersService.UpdateCustomer(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpDelete("{id:int}")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Delete Customers")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
        {
            var result = await _customersService.DeleteCustomer(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPost("AddAccount")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Add Account for Customers")]
        public async Task<IActionResult> AddAcountForCustomers([FromBody] CreateAccountForCustomerRequest request)
        {
            var result = await _customersService.AddAccountForCustomers(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut("UpdateAccount")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update Account of Customers")]
        public async Task<IActionResult> UpdateAcountForCustomer([FromBody] UpdateAccountOfCustomerRequest request)
        {
            var result = await _customersService.UpdateAccountOfCustomers(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
    }
}
