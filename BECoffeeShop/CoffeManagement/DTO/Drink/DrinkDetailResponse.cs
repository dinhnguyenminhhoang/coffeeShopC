using CoffeManagement.Models;

namespace CoffeManagement.DTO.Drink
{
    public class DrinkDetailResponse
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public IEnumerable<DrinkSize> DrinksSizes { get; set; } = Enumerable.Empty<DrinkSize>();

        public Recipe Recipe { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }

    public class DrinkSize
    {
        public int Id { get; set; }

        public string Size { get; set; }

        public double Ratio { get; set; }

        public double Price { get; set; }
    }

    public class  Recipe
    {
        public int Id { get; set; }

        public string Intructon { get; set; }

        public IEnumerable<RecipeDetail> RecipeDetails { get; set; } = new List<RecipeDetail>();

    }

    public class RecipeDetail
    {
        public int Id { get; set; }

        public int IngredientId { get; set; }

        public int Amount { get; set; }
    }
}
