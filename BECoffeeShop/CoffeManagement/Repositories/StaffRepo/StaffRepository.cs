using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.StaffRepo
{
    public class StaffRepository : SqlServerRepository<Staff>, IStaffRepository
    {

        private readonly DBContext _context;
        private readonly DbSet<Staff> _dbSet;

        public StaffRepository(DBContext context) : base(context)
        {

            _context = context;
            _dbSet = _context.Set<Staff>();
        }

        public Task<Staff?> GetByPhone(string phone)
        {
            return _dbSet.FirstOrDefaultAsync(x => x.Phone == phone);
        }


        public IQueryable<Staff> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
