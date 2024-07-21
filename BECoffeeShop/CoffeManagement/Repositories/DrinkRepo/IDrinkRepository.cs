using CoffeManagement.Models;

namespace CoffeManagement.Repositories.DrinkRepo
{
    public interface IDrinkRepository: IRepository<Drink>, IRepositoryQueryable<Drink>
    {
    }
}
