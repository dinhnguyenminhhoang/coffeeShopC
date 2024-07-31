using CoffeManagement.Data;
using CoffeManagement.Models;

namespace CoffeManagement.Repositories.DrinkRepo
{
    public class DrinkSizeRepository : SqlServerRepository<DrinkSize>, IDrinkSizeRepository
    {
        public DrinkSizeRepository(DBContext context) : base(context)
        {
        }
    }
}
