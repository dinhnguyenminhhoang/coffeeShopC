namespace CoffeManagement.DTO.Drink
{
    public class DrinkResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public string CategoryName { get; set; }

        public double MinPrice { get; set; }

        public double AverageRating { get; set; }
    }
}
