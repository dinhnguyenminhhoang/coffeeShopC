using CoffeManagement.DTO.Drinks;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Staffs;
using CoffeManagement.Models.Enum;
using CoffeManagement.Services.BrachesService;
using CoffeManagement.Services.StaffsService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("Staffs")]
    [ApiController]
    public class StaffsController :  BaseController
    {
        private readonly IStaffsService _staffsService;

        public StaffsController(IStaffsService staffsService)
        {
            _staffsService = staffsService;
        }

        [HttpGet]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get List Staffs")]
        public async Task<IActionResult> GetListStaffs([FromQuery] PagingDTO pagingDto)
        {
            var result = await _staffsService.GetListStaffs(pagingDto);

            return Ok(RenderSuccessResponse(result));
        }
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Staff Detail")]
        public async Task<IActionResult> GetStaffsDetail([FromRoute] int id)
        {
            var result = await _staffsService.GetStaffsDetail(id);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpPost]
        // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Create new staff")]
        public async Task<IActionResult> CreateStaffs(CreateStaffRequest request)
        {
            var result = await _staffsService.CreateStaffs(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut]
        // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update Staffs")]
        public async Task<IActionResult> UpdateStaffs([FromBody] UpdateStaffsRequest request)
        {
            var result = await _staffsService.UpdateStaffs(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpDelete("{id:int}")]
       // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Delete staff")]
        public async Task<IActionResult> DeleteStaffs([FromRoute] int id)
        {
            var result = await _staffsService.DeleteStaffs(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

    }
}
