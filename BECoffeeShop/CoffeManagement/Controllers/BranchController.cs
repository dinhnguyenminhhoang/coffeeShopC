using CoffeManagement.DTO.Branch;
using CoffeManagement.DTO.Drink;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models.Enum;
using CoffeManagement.Services.BrachService;
using CoffeManagement.Services.DrinkService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("Branches")]
    [ApiController]
    public class BranchController : BaseController
    {
        private readonly IBranchService _branchesService;

        public BranchController(IBranchService branchesService)
        {
            _branchesService = branchesService;
        }

        [HttpGet]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get List branches")]
        public async Task<IActionResult> GetListBranches([FromQuery] PagingDTO pagingDto)
        {
            var result = await _branchesService.GetListBranches(pagingDto);

            return Ok(RenderSuccessResponse(result));
        }
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Branches Detail")]
        public async Task<IActionResult> GetBranchesDetail([FromRoute] int id)
        {
            var result = await _branchesService.GetBranchesDetail(id);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpPost]
       // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Create new branches")]
        public async Task<IActionResult> CreateBranches(CreateBranchesRequest request)
        {
            var result = await _branchesService.CreateBranches(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut]
       // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update branches")]
        public async Task<IActionResult> UpdateBranches([FromBody] UpdateBranchesRequest request)
        {
            var result = await _branchesService.UpdateBranches(request);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpDelete("{id:int}")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Delete Branch")]
        public async Task<IActionResult> DeleteBranches([FromRoute] int id)
        {
            var result = await _branchesService.DeleteBranches(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
    }
}
