namespace CoffeManagement.DTO.Drink
{
    public class CreateDrinkRequest
    {
        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public IEnumerable<DrinkSizeCreate> DrinkSizes { get; set; } = Enumerable.Empty<DrinkSizeCreate>();
    }


    public class DrinkSizeCreate
    {
        public string Size { get; set; }

        public double Ratio { get; set; }

        public double Price { get; set; }
    }
}
