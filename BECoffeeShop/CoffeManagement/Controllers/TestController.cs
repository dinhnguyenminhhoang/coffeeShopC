using CoffeManagement.Infrastructure.Jwt;
using CoffeManagement.Models.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static System.Net.Mime.MediaTypeNames;

namespace CoffeManagement.Controllers
{
    [Route("Api/Test")]
    [ApiController]
    public class TestController : BaseController
    {
        private readonly HttpContext _httpContext;
        private readonly JwtUtil _jwtUtil;
        private readonly string P = AuthPolicy.POL_ADMIN.ToString();

        public TestController(IHttpContextAccessor httpContextAccessor, JwtUtil jwtUtil)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _jwtUtil = jwtUtil;
        }

        [AllowAnonymous]
        [HttpGet("get-token")]
        public async Task<IActionResult> GetToken()
        {
            var tokenExpired = DateTime.Now.Add(JwtUtil.ParseTimeSpan("2d"));


            var token = _jwtUtil.GenerateToken(
                new Claim[] {
                    new(ClaimTypes.Role, AuthRole.ROLE_ADMIN.ToString())
                },
                tokenExpired
            );

            return Ok(RenderSuccessResponse<string>(data: token));
        }

        [Authorize(Policy = nameof(AuthPolicy.POL_ADMIN))]
        [HttpGet("test-token")]
        public async Task<IActionResult> TestToken()
        {
            
            var a = _httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).ToString();

            return Ok(RenderSuccessResponse<object>(data: a));
        }

    }
}
