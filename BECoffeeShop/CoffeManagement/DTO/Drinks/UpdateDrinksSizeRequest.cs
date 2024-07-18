namespace CoffeManagement.DTO.Drinks
{
    public class UpdateDrinksSizeRequest
    {
        public int Id { get; set; }

        public string Size { get; set; }

        public double Ratio { get; set; }

        public double Price { get; set; }
    }
}
