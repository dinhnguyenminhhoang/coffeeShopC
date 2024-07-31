using CoffeManagement.DTO.Account;

namespace CoffeManagement.DTO.Staff
{
    public class UpdateAccountOfStaffRequest
    {
        public int StaffId { get; set; }
        public string Username { get; set; }
        public string? Password { get; set; }
        public bool IsActivated { get; set; } = true;
    }
}
