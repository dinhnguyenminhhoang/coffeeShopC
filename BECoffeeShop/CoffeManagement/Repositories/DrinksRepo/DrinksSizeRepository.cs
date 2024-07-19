using CoffeManagement.Data;
using CoffeManagement.Models;

namespace CoffeManagement.Repositories.DrinksRepo
{
    public class DrinksSizeRepository : SqlServerRepository<DrinksSize>, IDrinksSizeRepository
    {
        public DrinksSizeRepository(DBContext context) : base(context)
        {
        }
    }
}
