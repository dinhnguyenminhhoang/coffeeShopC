using CoffeManagement.Models;

namespace CoffeManagement.Repositories.BranchesRepo
{
    public interface IBranchesRepository:IRepository<Branch>, IRepositoryQueryable<Branch>
    {
    }
}
