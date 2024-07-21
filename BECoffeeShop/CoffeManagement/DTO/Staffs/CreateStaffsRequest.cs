using CoffeManagement.DTO.Drink;

namespace CoffeManagement.DTO.Staffs
{
    public class CreateStaffRequest
    {
        public string FullName { get; set; }

        public DateOnly Birthday { get; set; }

        public string Address { get; set; }

        public string Avatar { get; set; }

        public string CCCD { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public float Salary { get; set; }

        public int OnJobDays { get; set; }

        public int AsetDays { get; set; }

        public int Position { get; set; }

        public int BranchId { get; set; }

        public int AccountId { get; set; }
    }
}
