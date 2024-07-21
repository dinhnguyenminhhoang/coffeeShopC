using CoffeManagement.Models;

namespace CoffeManagement.Repositories.StaffRepo
{
    public interface IStaffRepository: IRepository<Staff>, IRepositoryQueryable<Staff>
    {
    }
}
