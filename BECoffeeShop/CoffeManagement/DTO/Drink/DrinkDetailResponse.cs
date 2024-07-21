namespace CoffeManagement.DTO.Drink
{
    public class DrinkDetailResponse
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public IEnumerable<DrinkSize> DrinksSizes { get; set; } = Enumerable.Empty<DrinkSize>();
    }

    public class DrinkSize
    {
        public int Id { get; set; }

        public string Size { get; set; }

        public double Ratio { get; set; }

        public double Price { get; set; }
    }

}
