using CoffeManagement.DTO.Account;

namespace CoffeManagement.DTO.Customer
{
    public class UpdateAccountOfCustomerRequest
    {
        public int CustomerId { get; set; }
        public string Username { get; set; }
        public string? Password { get; set; }
        public bool IsActivated { get; set; } = true;
    }
}
