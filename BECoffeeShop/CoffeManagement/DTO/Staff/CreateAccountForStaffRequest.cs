using CoffeManagement.DTO.Account;

namespace CoffeManagement.DTO.Staff
{
    public class CreateAccountForStaffRequest
    {
        public int StaffId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
