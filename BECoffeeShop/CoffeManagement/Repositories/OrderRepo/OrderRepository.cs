using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.OrderRepo
{
    public class OrderRepository : SqlServerRepository<Order>, IOrderRepository
    {
        private readonly DbContext _context;
        private readonly DbSet<Order> _dbSet;

        public OrderRepository(DBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<Order>();
        }

        public IQueryable<Order> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
