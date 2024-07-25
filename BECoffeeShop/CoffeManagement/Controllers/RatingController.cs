using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Rating;
using CoffeManagement.Models.Enum;
using CoffeManagement.Services.RatingService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{

    [Route("Rating")]
    [ApiController]
    public class RatingController : BaseController
    {
        private readonly IRatingService _ratingService;

        public RatingController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }


        [HttpPost]
        [Authorize(Policy = nameof(AuthPolicy.POL_CUSTOMER))]
        [SwaggerOperation(Summary = "Rating the Drinks")]
        public async Task<IActionResult> CreateDrinksRating([FromBody] CreateDrinkRatingRequest request)
        {
            var result = await _ratingService.CreateDrinksRating(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut]
        [Authorize(Policy = nameof(AuthPolicy.POL_CUSTOMER))]
        [SwaggerOperation(Summary = "Update the Rating")]
        public async Task<IActionResult> UpdateDrinksRating([FromBody] UpdateDrinkRatingRequest request)
        {
            var result = await _ratingService.UpdateDrinksRating(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut("Feedback")]
        [Authorize(Policy = nameof(AuthPolicy.POL_STAFF))]
        [SwaggerOperation(Summary = "Feedback the Rating")]
        public async Task<IActionResult> FeedbackDrinksRating([FromBody] FeedbackDrinkRatingRequest request)
        {
            var result = await _ratingService.FeedbackDrinksRating(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpGet("List/{drinkId:int}")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "List the Rating of Drink")]
        public async Task<IActionResult> DrinksRatingList([FromRoute] int drinkId, [FromQuery] PagingDTO pagingDTO)
        {
            var result = await _ratingService.DrinksRatingList(drinkId, pagingDTO);

            return Ok(RenderSuccessResponse(data: result));
        }

        [HttpGet("Detail/{id:int}")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Detail of Rating")]
        public async Task<IActionResult> DetailDrinksRating([FromRoute] int id)
        {
            var result = await _ratingService.DetailDrinksRating(id);

            return Ok(RenderSuccessResponse(data: result));
        }
    }
}
