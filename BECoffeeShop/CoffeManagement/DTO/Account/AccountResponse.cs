namespace CoffeManagement.DTO.Account
{
    public class AccountResponse
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Type { get; set; }

        public bool? IsActivated { get; set; }

        public DateTime? CreatedAt { get; set; }

    }
}
