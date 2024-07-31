namespace CoffeManagement.DTO.Rating
{
    public class DrinkRatingDetailResponse
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public decimal Rating { get; set; }

        public string Content { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DrinkRatingDetail_Drink Drink { get; set; }

        public DrinkRatingDetail_Customer Customer { get; set; }

        public DrinkRatingDetail_Feedback Feedback { get; set; }
    }


    public class DrinkRatingDetail_Customer
    {
        public int Id { get; set; }
        public string FullName { get; set; }
    }

    public class DrinkRatingDetail_Staff
    {
        public int Id { get; set; }
        public string FullName { get; set; }
    }

    public class DrinkRatingDetail_Drink
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }
    }

    public class DrinkRatingDetail_Feedback
    {
        public DrinkRatingDetail_Staff Staff { get; set; }
        
        public string FeedbackContent { get; set; }

        public DateTime? FeedbackAt { get; set; }
    }
}
