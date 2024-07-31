using CoffeManagement.Models;

namespace CoffeManagement.Repositories.CategoryRepo
{
    public interface ICategoryRepository: IRepository<Category>, IRepositoryQueryable<Category>
    {
        Task<Category?> GetByName(string name);
    }
}
