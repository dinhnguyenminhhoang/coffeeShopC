using CoffeManagement.Models;

namespace CoffeManagement.Repositories.CustomerRepo
{
    public interface IAccountRepository : IRepository<Account>
    {
        Task<Account?> GetByUsername(string username);
    }
}
