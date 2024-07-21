using CoffeManagement.DTO.Account;
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

        public string Position { get; set; }

        public int BranchId { get; set; }

        public CreateAccountRequest? Account { get; set; }

    }
}
