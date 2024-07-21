using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.DrinkRepo
{
    public class DrinkRepository : SqlServerRepository<Drink>, IDrinkRepository
    {

        private readonly DBContext _context;
        private readonly DbSet<Drink> _dbSet;

        public DrinkRepository(DBContext context) : base(context)
        {

            _context = context;
            _dbSet = _context.Set<Drink>();
        }

        public IQueryable<Drink> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
