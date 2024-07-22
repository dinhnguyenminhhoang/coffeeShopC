namespace CoffeManagement.DTO.Drink
{
    public class UpdateRecipeRequest
    {
        public int Id { get; set; }

        public string Intructon { get; set; }

        public IEnumerable<RecipeDetailUpdate> RecipeDetails { get; set; }
    }


    public class RecipeDetailUpdate
    {
        public int IngredientId { get; set; }

        public double Amount { get; set; }
    }
}
