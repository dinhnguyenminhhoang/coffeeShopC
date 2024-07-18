using CoffeManagement.Data;
using CoffeManagement.DTO.Drinks;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Services.DrinksService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Controllers
{
    [Route("Api/Drinks")]
    [ApiController]
    public class DrinksController : BaseController
    {
        private readonly IDrinksService _drinksService;

        public DrinksController(IDrinksService drinksService)
        {
            _drinksService = drinksService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<IEnumerable<DrinksResponse>>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        public async Task<IActionResult> GetListDrinks([FromQuery] PagingDTO pagingDto)
        {
            var result = await _drinksService.GetListDrinks(pagingDto);

            return Ok(RenderSuccessResponse(result));
        }

        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SuccessResponse<int>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        public async Task<IActionResult> CreateDrinks(CreateDrinksRequest createDrinksRequest)
        {
            var result = await _drinksService.CreateDrinks(createDrinksRequest);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

    }
}
