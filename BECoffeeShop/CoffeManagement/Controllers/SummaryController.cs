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
        
        
        [HttpGet("Chart/AmountSoldOfCategory")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Data Amount Sold Of Category")]
        public async Task<IActionResult> GetAmountSoldOfCategory_Chart([FromQuery] SummaryFilter filter)
        {
            var result = await _summaryService.GetAmountSoldOfCategory_Chart(filter);

            return Ok(RenderSuccessResponse(result));
        }
        
        
        [HttpGet("Chart/Overview")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Data Overview for Chart")]
        public async Task<IActionResult> GetOverview_Chart([FromQuery] SummaryFilter filter)
        {
            var result = await _summaryService.GetOverview_Chart(filter);

            return Ok(RenderSuccessResponse(result));
        }
        
        
        [HttpGet("Chart/Orders")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Data Order for Chart")]
        public async Task<IActionResult> GetOrders_Chart([FromQuery] SummaryFilter filter)
        {
            var result = await _summaryService.GetOrders_Chart(filter);

            return Ok(RenderSuccessResponse(result));
        }
        
        
        [HttpGet("Chart/RevenueAndProfit")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Data Revenue and Profit for Chart")]
        public async Task<IActionResult> GetRevenueAndProfit_Chart([FromQuery] SummaryFilter filter)
        {
            var result = await _summaryService.GetRevenueAndProfit_Chart(filter);

            return Ok(RenderSuccessResponse(result));
        }

    }
}
