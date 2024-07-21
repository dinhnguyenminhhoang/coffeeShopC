namespace CoffeManagement.DTO.Staff
{
    public class UpdateStaffsRequest
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

        public string Position { get; set; }

        public int BranchId { get; set; }
    }
}
