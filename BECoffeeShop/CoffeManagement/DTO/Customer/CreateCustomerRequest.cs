using CoffeManagement.DTO.Account;

namespace CoffeManagement.DTO.Customer
{
    public class CreateCustomerRequest
    {
        public string FullName {  get; set; }

        public string Phone {  get; set; }

        public string Address { get; set; }

        public CreateAccountRequest? Account { get; set; }
    }
}
