using CoffeManagement.DTO.PaymentStripe;
using Microsoft.Extensions.Options;
using Stripe;

namespace CoffeManagement.Services.PaymentStripeService
{
    public class PaymentStripeService : IPaymentStripeService
    {
        private readonly string _apiKey;

        public PaymentStripeService()
        {
            _apiKey = "sk_test_51O2Re5Ch5jfUlQ3sBR7aUGkRQ21eF2To4YK22JzAkzfzMrGza7JtrwTex1UfqJaJByLGHJOQYmr1ZeQ8CstNEDVm00o1sNEU3O"; // Đặt khóa bí mật của bạn ở đây hoặc sử dụng cấu hình môi trường
            StripeConfiguration.ApiKey = _apiKey;
        }

        public async Task<string> CreatePaymentIntentAsync(decimal amount, string currency)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(amount * 100), // Stripe yêu cầu số tiền dưới dạng số nguyên nhỏ (cent)
                Currency = currency,
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
            };

            var service = new PaymentIntentService();
            PaymentIntent intent = await service.CreateAsync(options);
            return intent.ClientSecret;
        }
    }
}
