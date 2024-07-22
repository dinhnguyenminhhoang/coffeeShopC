using CoffeManagement.Data;
using CoffeManagement.Models;
using CoffeManagement.Repositories.CustomerRepo;

namespace CoffeManagement.Repositories.IngredientRepo
{
    public class IngredientStockRepository : SqlServerRepository<IngredientStock>, IIngredientStockRepository
    {
        public IngredientStockRepository(DBContext context) : base(context)
        {
        }
    }
}
