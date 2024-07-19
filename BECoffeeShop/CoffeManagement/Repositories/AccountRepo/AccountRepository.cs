using CoffeManagement.Data;
using CoffeManagement.Models;
using CoffeManagement.Models.Enum;
using CoffeManagement.Repositories.DrinksRepo;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.CustomerRepo
{
    public class AccountRepository : SqlServerRepository<Account>, IAccountRepository
    {
        private readonly DBContext _context;
        private readonly DbSet<Account> _dbSet;

        public AccountRepository(DBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<Account>();
        }

        public Task<Account?> GetAccountCustomerByUsername(string username)
        {
            return _dbSet.Where(acc => acc.Type.Equals(AccountType.ACC_CUS.ToString()) && acc.Username == username).FirstOrDefaultAsync();
        }
        public Task<Account?> GetAccountStaffByUsername(string username)
        {
            return _dbSet.Where(acc => acc.Type.Equals(AccountType.ACC_STA.ToString()) && acc.Username == username).FirstOrDefaultAsync();
        }
    }
}
