using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Staff
{
    public class StaffsResponse
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public DateOnly Birthday { get; set; }

        public string Address { get; set; }

        public string Avatar { get; set; }

        public string CCCD { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public float Salary { get; set; }

        public int OnJobDays { get; set; }

        public int AsentDays { get; set; }

        public int AsetDays { get; set; }

        public string Position { get; set; }

        public int BranchId { get; set; }

        [JsonIgnore]        
        public int AccountId { get; set; }

        public bool IsActivated { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        // --------------------
        public bool IsHaveAccount { get => AccountId > 0; }

    }
}
