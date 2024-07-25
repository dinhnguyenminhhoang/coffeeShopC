namespace CoffeManagement.DTO.Rating
{
    public class DrinkRatingResponse
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public decimal Rating { get; set; }

        public string Content { get; set; }

        public bool HasFeedback { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DrinkRatingDetail_Customer Customer { get; set; }
    }
}
