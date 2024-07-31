using CoffeManagement.DTO.Branch;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Voucher;
using CoffeManagement.Services.VoucherService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("Vouchers")]
    [ApiController]
    public class VoucherController : BaseController
    {
        private readonly IVoucherService _voucherService;

        public VoucherController(IVoucherService voucherService)
        {
            _voucherService = voucherService;
        }

        [HttpGet]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get List Voucher")]
        public async Task<IActionResult> GetListVoucher([FromQuery] PagingDTO pagingDto, [FromQuery] ListVoucherFilter filter)
        {
            var result = await _voucherService.GetListVoucher(pagingDto, filter);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Voucher Detail")]
        public async Task<IActionResult> GetDetailVoucher([FromRoute] int id)
        {
            var result = await _voucherService.GetDetailVoucher(id);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpPost]
       // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Create new Voucher")]
        public async Task<IActionResult> CreateVoucher([FromBody] CreateVoucherRequest request)
        {
            var result = await _voucherService.CreateVoucher(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut]
       // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update Voucher")]
        public async Task<IActionResult> UpdateVoucher([FromBody] UpdateVoucherRequest request)
        {
            var result = await _voucherService.UpdateVoucher(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpDelete("{id:int}")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Delete Voucher")]
        public async Task<IActionResult> DeleteVoucher([FromRoute] int id)
        {
            var result = await _voucherService.DeleteVoucher(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
    }
}
