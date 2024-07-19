namespace CoffeManagement.DTO.Drinks
{
    public class CreateDrinksRequest
    {
        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public IEnumerable<DrinksSizeCreate> DrinksSizes { get; set; } = Enumerable.Empty<DrinksSizeCreate>();
    }


    public class DrinksSizeCreate
    {
        public string Size { get; set; }

        public double Ratio { get; set; }

        public double Price { get; set; }
    }
}
