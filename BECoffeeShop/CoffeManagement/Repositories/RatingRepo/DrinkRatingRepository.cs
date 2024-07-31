using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.RatingRepo
{
    public class DrinkRatingRepository : SqlServerRepository<DrinkRating>, IDrinkRatingRepository
    {
        private readonly DBContext _context;
        private readonly DbSet<DrinkRating> _dbSet;

        public DrinkRatingRepository(DBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<DrinkRating>();
        }

        public IQueryable<DrinkRating> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
