using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Summary;
using CoffeManagement.Services.SummaryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("Summary")]
    [ApiController]
    public class SummaryController : BaseController
    {
        private readonly ISummaryService _summaryService;

        public SummaryController(ISummaryService summaryService)
        {
            _summaryService = summaryService;
        }

        [HttpGet("Parameters")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get parameters (customer, staff, drink, branch, category)")]
        public async Task<IActionResult> GetParameters()
        {
            var result = await _summaryService.GetParameters();

            return Ok(RenderSuccessResponse(result));
        }
        
        [HttpGet("Table/BestSellingDrinks")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Data Best Selling Drink for Table")]
        public async Task<IActionResult> GetBestSellDrinks_Table([FromQuery] SummaryFilter filter)
        {
            var result = await _summaryService.GetBestSellDrinks_Table(filter);

            return Ok(RenderSuccessResponse(result));
        }
        
        [HttpGet("Table/BestSellingStaff")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Data Best Selling Staff for Table")]
        public async Task<IActionResult> GetBestSellStaff_Table([FromQuery] SummaryFilter filter)
        {
            var result = await _summaryService.GetBestSellStaff_Table(filter);

            return Ok(RenderSuccessResponse(result));
        }
        
        
        [HttpGet("Table/RecentOrders")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Data Recent Order")]
        public async Task<IActionResult> GetRecentOrders_Table([FromQuery] SummaryFilter filter)
        {
            var result = await _summaryService.GetRecentOrders_Table(filter);

            return Ok(RenderSuccessResponse(result));
        }

    }
}
