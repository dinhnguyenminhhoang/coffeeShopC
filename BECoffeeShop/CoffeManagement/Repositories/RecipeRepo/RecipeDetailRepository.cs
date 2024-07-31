using CoffeManagement.Data;
using CoffeManagement.Models;
using CoffeManagement.Repositories.DrinkRepo;

namespace CoffeManagement.Repositories.RecipeRepo
{
    public class RecipeDetailRepository : SqlServerRepository<RecipeDetail>, IRecipeDetailRepository
    {
        public RecipeDetailRepository(DBContext context) : base(context)
        {
        }
    }
}
