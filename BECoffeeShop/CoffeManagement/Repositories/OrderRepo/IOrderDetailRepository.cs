using CoffeManagement.Models;

namespace CoffeManagement.Repositories.OrderRepo
{
    public interface IOrderDetailRepository: IRepository<OrderDetail>, IRepositoryQueryable<OrderDetail>
    {
    }
}
