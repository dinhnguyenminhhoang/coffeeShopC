using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.OrderRepo
{
    public class OrderDetailRepository : SqlServerRepository<OrderDetail>, IOrderDetailRepository
    {
        private readonly DBContext _context;
        private readonly DbSet<OrderDetail> _dbSet;

        public OrderDetailRepository(DBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<OrderDetail>();
        }

        public IQueryable<OrderDetail> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
