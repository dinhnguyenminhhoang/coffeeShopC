using CoffeManagement.Models;

namespace CoffeManagement.Repositories.CustomerRepo
{
    public interface ICustomerRepository: IRepository<Customer>, IRepositoryQueryable<Customer>
    {
       Task<Customer?> GetByPhone(string phone);
       Task<Customer?> GetByEmail(string email);
    }
}
