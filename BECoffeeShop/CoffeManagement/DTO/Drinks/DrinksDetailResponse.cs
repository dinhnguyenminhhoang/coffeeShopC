namespace CoffeManagement.DTO.Drinks
{
    public class DrinksDetailResponse
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public IEnumerable<DrinksSize> DrinksSizes { get; set; } = Enumerable.Empty<DrinksSize>();
    }

    public class DrinksSize
    {
        public int Id { get; set; }

        public string Size { get; set; }

        public double Ratio { get; set; }

        public double Price { get; set; }
    }

}
