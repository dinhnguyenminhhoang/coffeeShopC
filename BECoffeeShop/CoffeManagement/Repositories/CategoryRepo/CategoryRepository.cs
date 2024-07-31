using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.CategoryRepo
{
    public class CategoryRepository : SqlServerRepository<Category>, ICategoryRepository
    {
        private readonly DBContext _context;
        private readonly DbSet<Category> _dbSet;

        public CategoryRepository(DBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<Category>();
        }

        public Task<Category?> GetByName(string name)
        {
            return _dbSet.Where(c => c.Name == name).FirstOrDefaultAsync();
        }

        public IQueryable<Category> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
