namespace CoffeManagement.DTO.Staffs
{
    public class StaffsDetailResponse
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

        public int AsetDays { get; set; }

        public int Position { get; set; }
    }
}
