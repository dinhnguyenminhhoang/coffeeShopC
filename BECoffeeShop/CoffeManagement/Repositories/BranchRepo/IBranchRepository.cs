using CoffeManagement.Models;

namespace CoffeManagement.Repositories.BranchRepo
{
    public interface IBranchRepository:IRepository<Branch>, IRepositoryQueryable<Branch>
    {
    }
}
