using CoffeManagement.DTO.Category;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Services.BrachService;
using CoffeManagement.Services.CategoryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("Category")]
    [ApiController]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get List Category")]
        public async Task<IActionResult> GetListCategory([FromQuery] PagingDTO pagingDto)
        {
            var result = await _categoryService.GetListCategory(pagingDto);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Get Category Detail")]
        public async Task<IActionResult> GetCategoryDetail([FromRoute] int id)
        {
            var result = await _categoryService.GetCategoryDetail(id);

            return Ok(RenderSuccessResponse(result));
        }

        [HttpPost]
       // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Create new Category")]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequest request)
        {
            var result = await _categoryService.CreateCategory(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpPut]
       // [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Update Category")]
        public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategoryRequest request)
        {
            var result = await _categoryService.UpdateCategory(request);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }

        [HttpDelete("{id:int}")]
        //[Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [SwaggerOperation(Summary = "Delete Category")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            var result = await _categoryService.DeleteCategory(id);

            return Ok(RenderSuccessResponse(data: result, message: "SUCCESS"));
        }
    }
}
