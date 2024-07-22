using CoffeManagement.DTO.Branch;
using CoffeManagement.DTO.Drink;
using CoffeManagement.DTO.Ingredient;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models.Enum;
using CoffeManagement.Services.BrachService;
using CoffeManagement.Services.DrinkService;
using CoffeManagement.Services.IngredientService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("Ingredients")]
    [ApiController]
    public class IngredientController : BaseController
    {
        private readonly IIngredientService _ingredientService;

        public IngredientController(IIngredientService ingredientService)
        {
            _ingredientService = ingredientService;
        }

        [HttpGet]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get List Ingredient")]
        public async Task<IActionResult> GetListIngredient([FromQuery] PagingDTO pagingDto)
        {
            var result = await _ingredientService.GetListIngredient(pagingDto);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Ingredient Detail")]
        public async Task<IActionResult> GetIngredientDetail([FromRoute] int id)
        {
            var result = await _ingredientService.GetIngredientDetail(id);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpPost]
       // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Create new Ingredient")]
        public async Task<IActionResult> CreateIngredient(CreateIngredientRequest request)
        {
            var result = await _ingredientService.CreateIngredient(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut]
       // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update Ingredient")]
        public async Task<IActionResult> UpdateIngredient([FromBody] UpdateIngredientRequest request)
        {
            var result = await _ingredientService.UpdateIngredient(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpDelete("{id:int}")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Delete Ingredient")]
        public async Task<IActionResult> DeleteIngredient([FromRoute] int id)
        {
            var result = await _ingredientService.DeleteIngredient(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPost("Stock")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Import Ingredient into Stock")]
        public async Task<IActionResult> AddIngredientStock([FromBody] CreateIngredientStockRequest request)
        {
            var result = await _ingredientService.AddIngredientStock(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
    }
}
