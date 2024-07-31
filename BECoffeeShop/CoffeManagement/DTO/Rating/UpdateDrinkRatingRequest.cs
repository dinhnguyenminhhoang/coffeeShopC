namespace CoffeManagement.DTO.Rating
{
    public class UpdateDrinkRatingRequest
    {
        public int Id { get; set; }

        public decimal Rating { get; set; }

        public string Content { get; set; }
    }
}
