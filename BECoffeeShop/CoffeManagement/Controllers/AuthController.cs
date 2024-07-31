using CoffeManagement.DTO.Authentication;
using CoffeManagement.Infrastructure.Email;
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
        public async Task<IActionResult> StaffLogin([FromBody] LoginRequest request)
        {
            var result = await _authenticationService.StaffLogin(request);

            return Ok(RenderSuccessResponse<LoginResponse?>(data: result, message: "Login Success"));
        }

        [AllowAnonymous]
        [HttpPost("Customer/Login")]
        public async Task<IActionResult> CustomerRegister([FromBody] LoginRequest request)
        {
            var result = await _authenticationService.CustomerLogin(request);

            return Ok(RenderSuccessResponse<LoginResponse?>(data: result, message: "Login Success"));
        }


        [AllowAnonymous]
        [HttpPost("Customer/Register")]
        public async Task<IActionResult> CustomerLogin([FromBody] CustomerRegisterRequest request)
        {
            var result = await _authenticationService.CustomerRegister(request);

            return Ok(RenderSuccessResponse<int?>(data: result, message: "Register Success"));
        }

        [AllowAnonymous]
        [HttpPost("Customer/ForgotPassword")]
        public async Task<IActionResult> CustomerForgot([FromBody] CustomerForgotPasswordRequest request)
        {
            var result = await _authenticationService.CustomerForgotPassword(request);

            return Ok(RenderSuccessResponse<int?>(data: result, message: "Please check email."));
        }

        [AllowAnonymous]
        [HttpPost("Customer/ResetPassword")]
        public async Task<IActionResult> CustomerReset([FromBody] CustomerResetPasswordRequest request)
        {
            var result = await _authenticationService.CustomerResetPassword(request);

            return Ok(RenderSuccessResponse<int?>(data: result, message: "Password resset success."));
        }
    }
}
