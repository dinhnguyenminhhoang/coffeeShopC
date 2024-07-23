using CoffeManagement.Data;
using CoffeManagement.Models;

namespace CoffeManagement.Repositories.OrderRepo
{
    public class OrderDetailRepository : SqlServerRepository<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(DBContext context) : base(context)
        {
        }
    }
}
