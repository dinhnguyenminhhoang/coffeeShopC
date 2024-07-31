using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.BranchRepo
{
    public class BranchRepository: SqlServerRepository<Branch>,IBranchRepository
    {
        private readonly DbContext _context;
        private readonly DbSet<Branch> _dbSet;

        public BranchRepository(DBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<Branch>();
        }
        
        public IQueryable<Branch> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
