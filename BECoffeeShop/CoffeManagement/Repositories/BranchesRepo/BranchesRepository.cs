using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.BranchesRepo
{
    public class BranchesRepository: SqlServerRepository<Branch>,IBranchesRepository
    {
        private readonly DbContext _context;
        private readonly DbSet<Branch> _dbSet;
        public BranchesRepository(DBContext context) : base(context)
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
