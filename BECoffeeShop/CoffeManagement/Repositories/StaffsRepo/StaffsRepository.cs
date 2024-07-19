using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.StaffsRepo
{
    public class StaffsRepository : SqlServerRepository<Staff>, IStaffsRepository
    {

        private readonly DBContext _context;
        private readonly DbSet<Staff> _dbSet;

        public StaffsRepository(DBContext context) : base(context)
        {

            _context = context;
            _dbSet = _context.Set<Staff>();
        }

        public IQueryable<Staff> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
