using CoffeManagement.Data;
using CoffeManagement.DTO.Drinks;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models.Enum;
using CoffeManagement.Services.DrinksService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("Drinks")]
    [ApiController]
    public class DrinksController : BaseController
    {
        private readonly IDrinksService _drinksService;

        public DrinksController(IDrinksService drinksService)
        {
            _drinksService = drinksService;
        }

        [HttpGet]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get List Drinks")]
        public async Task<IActionResult> GetListDrinks([FromQuery] PagingDTO pagingDto)
        {
            var result = await _drinksService.GetListDrinks(pagingDto);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Drinks Detail")]
        public async Task<IActionResult> GetDrinksDetail([FromRoute] int id)
        {
            var result = await _drinksService.GetDrinksDetail(id);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpPost]
        [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Create new Drinks")]
        public async Task<IActionResult> CreateDrinks(CreateDrinksRequest request)
        {
            var result = await _drinksService.CreateDrinks(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }


        [HttpPut]
        [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update Drinks")]
        public async Task<IActionResult> GetUpdateDrinks([FromBody] UpdateDrinksRequest request)
        {
            var result = await _drinksService.UpdateDrinks(request);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpDelete("Size/{id:int}")]
        [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Delete Drinks_Size from Drinsk")]
        public async Task<IActionResult> DeleteDrinksSize([FromRoute] int id)
        {
            var result = await _drinksService.DeleteDrinksSize(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPost("Size")]
        [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Add Drinks_Size to Drinsk")]
        public async Task<IActionResult> CreateDrinksSize([FromBody] CreateDrinksSizeRequest request)
        {
            var result = await _drinksService.CreateDrinksSize(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut("Size")]
        [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update Drinks_Size")]
        public async Task<IActionResult> UpdateDrinksSize([FromBody] UpdateDrinksSizeRequest request)
        {
            var result = await _drinksService.UpdateDrinksSize(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

    }
}
