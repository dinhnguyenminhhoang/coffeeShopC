using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.IngredientRepo
{
    public class IngredientRepository : SqlServerRepository<Ingredient>, IIngredientRepository
    {
        private readonly DBContext _context;
        private readonly DbSet<Ingredient> _dbSet;

        public IngredientRepository(DBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<Ingredient>();
        }

        public IQueryable<Ingredient> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
