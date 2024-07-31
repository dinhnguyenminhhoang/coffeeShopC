using CoffeManagement.Models;

namespace CoffeManagement.Repositories.OrderRepo
{
    public interface IOrderRepository: IRepository<Order>, IRepositoryQueryable<Order>
    {
    }
}
