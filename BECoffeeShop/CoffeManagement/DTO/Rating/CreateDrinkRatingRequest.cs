namespace CoffeManagement.DTO.Rating
{
    public class CreateDrinkRatingRequest
    {
        public int DrinkId { get; set; }

        public int OrderId { get; set; }

        public decimal Rating { get; set; }

        public string Content { get; set; }

    }
}
