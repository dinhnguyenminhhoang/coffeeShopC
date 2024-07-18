namespace CoffeManagement.DTO.Drinks
{
    public class CreateDrinksSizeRequest
    {
        public int DrinkId { get; set; }

        public string Size { get; set; }

        public double Ratio { get; set; }

        public double Price { get; set; }
    }
}
