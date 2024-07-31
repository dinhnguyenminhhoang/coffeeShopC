using CoffeManagement.Models;

namespace CoffeManagement.Repositories.CustomerRepo
{
    public interface IAccountRepository : IRepository<Account>
    {
        Task<Account?> GetAccountCustomerByUsername(string username);
        Task<Account?> GetAccountStaffByUsername(string username);
        Task<Account?> GetAccountByUsername(string username);
    }
}
