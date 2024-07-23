namespace CoffeManagement.Infrastructure.Email.Models
{
    public class ResetPasswordModel
    {
        public required string SiteUrl { get; set; }
        public required string FullName { get; set; }
        public required string Token { get; set; }
    }
}
