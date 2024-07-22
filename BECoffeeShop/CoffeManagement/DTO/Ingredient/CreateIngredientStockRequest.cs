namespace CoffeManagement.DTO.Ingredient
{
    public class CreateIngredientStockRequest
    {
        public int IngredientId { get; set; }                         

        public double Amount { get; set; }

        public double Cost { get; set; }

        public DateTime? ReceivedAt { get; set; }

        public DateTime ExpiredAt { get; set; }
    }
}
