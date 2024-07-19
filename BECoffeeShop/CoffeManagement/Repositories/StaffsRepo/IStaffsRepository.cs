using CoffeManagement.Models;

namespace CoffeManagement.Repositories.StaffsRepo
{
    public interface IStaffsRepository: IRepository<Staff>, IRepositoryQueryable<Staff>
    {
    }
}
