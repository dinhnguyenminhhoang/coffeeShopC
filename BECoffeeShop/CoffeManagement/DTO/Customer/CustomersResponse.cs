using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Customer
{
    public class CustomersResponse
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        [JsonIgnore]
        public int AccountId { get; set; }

        public bool? IsActivated { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        // ------------------------

        public bool IsHaveAccount { get => AccountId > 0; }

    }
}
