namespace CoffeManagement.DTO.Drink
{
    public class UpdateDrinkRequest
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Image { get; set; }

        public string? Description { get; set; }

        public int? CategoryId { get; set; }
    }
}
