namespace CoffeManagement.Services.PaymentStripeService
{
    public interface IPaymentStripeService
    {
        Task<string> CreatePaymentIntentAsync(decimal amount, string currency);
    }
}
