using CoffeManagement.Data;
using CoffeManagement.Models;
using CoffeManagement.Repositories.DrinkRepo;

namespace CoffeManagement.Repositories.RecipeRepo
{
    public class RecipeRepository : SqlServerRepository<Recipe>, IRecipeRepository
    {
        public RecipeRepository(DBContext context) : base(context)
        {
        }
    }
}
