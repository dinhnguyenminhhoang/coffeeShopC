namespace CoffeManagement.DTO.Customers
{
    public class UpdateCustomerRequest
    {
        public int Id { get; set; }
        public string FullName { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

    }
}
