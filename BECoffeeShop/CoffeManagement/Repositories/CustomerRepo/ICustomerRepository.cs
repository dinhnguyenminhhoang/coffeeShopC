using CoffeManagement.Models;

namespace CoffeManagement.Repositories.CustomerRepo
{
    public interface ICustomerRepository: IRepository<Customer>
    {
        Task<Customer?> GetByPhone(string phone);
    }
}
