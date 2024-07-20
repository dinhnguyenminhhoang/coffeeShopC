using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.CustomerRepo
{
    public class CustomerRepository : SqlServerRepository<Customer>, ICustomerRepository
    {

        private readonly DBContext _context;
        private readonly DbSet<Customer> _dbSet;

        public CustomerRepository(DBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<Customer>();
        }

        public Task<Customer?> GetByPhone(string phone)
        {
            return _dbSet.FirstOrDefaultAsync(x => x.Phone == phone);
        }
        public IQueryable<Customer> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
