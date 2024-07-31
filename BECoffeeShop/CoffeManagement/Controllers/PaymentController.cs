using CoffeManagement.DTO.PaymentStripe;
using CoffeManagement.Services.PaymentStripeService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CoffeManagement.Controllers
{
    [Route("payment/stripe")]
    [ApiController]
    public class PaymentController : BaseController
    {
        private readonly IPaymentStripeService _paymentStripeService;
        public PaymentController(IPaymentStripeService paymentStripeService)
        {
            _paymentStripeService = paymentStripeService;
        }

        [HttpPost]
        [AllowAnonymous]
        [SwaggerOperation(Summary = "Payment with stripe")]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] PaymentRequest request)
        {
            var clientSecret = await _paymentStripeService.CreatePaymentIntentAsync(request.Amount, request.Currency);
            return Ok(RenderSuccessResponse(clientSecret));
        }
    }
}
