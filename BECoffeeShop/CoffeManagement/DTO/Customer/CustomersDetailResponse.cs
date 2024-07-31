using CoffeManagement.DTO.Account;
using CoffeManagement.Models;

namespace CoffeManagement.DTO.Customer
{
    public class CustomersDetailResponse
    {
        public int Id { get; set; }
        
        public string FullName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public int AccountId { get; set; }

        public bool? IsActivated { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
        
        // -------------------------------

        public AccountResponse Account { get; set; }
    }
}
