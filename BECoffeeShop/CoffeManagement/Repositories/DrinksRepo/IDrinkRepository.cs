using CoffeManagement.Models;

namespace CoffeManagement.Repositories.DrinksRepo
{
    public interface IDrinkRepository: IRepository<Drinks>, IRepositoryQueryable<Drinks>
    {
    }
}
