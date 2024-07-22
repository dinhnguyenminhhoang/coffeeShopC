using CoffeManagement.Models;

namespace CoffeManagement.DTO.Ingredient
{
    public class IngredientDetailResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public IEnumerable<IngredientStockDetail> IngredientStocks { get; set; } = new List<IngredientStockDetail>();

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }

    public class IngredientStockDetail
    {
        public int Id { get; set; }

        public double Amount { get; set; }

        public double Remain { get; set; }

        public double Cost { get; set; }

        public DateTime? ReceivedAt { get; set; }

        public DateTime ExpiredAt { get; set; }
    }
}
