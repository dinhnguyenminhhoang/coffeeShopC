using CoffeManagement.Models;

namespace CoffeManagement.Repositories.IngredientRepo
{
    public interface IIngredientRepository: IRepository<Ingredient>, IRepositoryQueryable<Ingredient>
    {
    }
}
