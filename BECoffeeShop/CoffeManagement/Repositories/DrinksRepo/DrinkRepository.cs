using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.DrinksRepo
{
    public class DrinkRepository : SqlServerRepository<Drinks>, IDrinkRepository
    {

        private readonly DBContext _context;
        private readonly DbSet<Drinks> _dbSet;

        public DrinkRepository(DBContext context) : base(context)
        {

            _context = context;
            _dbSet = _context.Set<Drinks>();
        }

        public IQueryable<Drinks> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
