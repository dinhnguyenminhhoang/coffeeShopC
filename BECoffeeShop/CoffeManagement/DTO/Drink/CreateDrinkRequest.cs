namespace CoffeManagement.DTO.Drink
{
    public class CreateDrinkRequest
    {
        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public required IEnumerable<DrinkSizeCreate> DrinkSizes { get; set; } = Enumerable.Empty<DrinkSizeCreate>();
        
        public required RecipeCreate Recipe { get; set; }
    }

    public class DrinkSizeCreate
    {
        public string Size { get; set; }

        public double Ratio { get; set; }

        public double Price { get; set; }
    }

    public class RecipeCreate
    {
        public string Intructon { get; set; }

        public IEnumerable<RecipeDetailCreate> RecipeDetails { get; set; }
    }

    public class RecipeDetailCreate
    {
        public int IngredientId { get; set; }

        public int Amount { get; set; }
    }
}
