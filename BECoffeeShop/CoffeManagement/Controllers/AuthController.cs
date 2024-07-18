using CoffeManagement.DTO.Authentication;
using CoffeManagement.Services.AccountService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Controllers
{
    [Route("Api/Auth")]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [AllowAnonymous]
        [HttpPost("Staff/Login")]
        public async Task<IActionResult> StaffLogin([FromBody] LoginRequest loginRequest)
        {
            var result = await _authenticationService.StaffLogin(loginRequest);

            return Ok(RenderSuccessResponse<LoginResponse?>(data: result, message: "Login Success"));
        }

        [AllowAnonymous]
        [HttpPost("Customer/Login")]
        public async Task<IActionResult> CustomerRegister([FromBody] LoginRequest loginRequest)
        {
            var result = await _authenticationService.CustomerLogin(loginRequest);

            return Ok(RenderSuccessResponse<LoginResponse?>(data: result, message: "Login Success"));
        }


        [AllowAnonymous]
        [HttpPost("Customer/Register")]
        public async Task<IActionResult> CustomerLogin([FromBody] CustomerRegisterRequest customerRegisterRequest)
        {
            var result = await _authenticationService.CustomerRegister(customerRegisterRequest);

            return Ok(RenderSuccessResponse<int?>(data: result, message: "Register Success"));
        }
    }
}
