using CoffeManagement.Models;

namespace CoffeManagement.Repositories.VoucherRepo
{
    public interface IVoucherRepository: IRepository<Voucher>, IRepositoryQueryable<Voucher>
    {
        Task<Voucher?> GetByCode(string code);
    }
}
