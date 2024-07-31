using CoffeManagement.Data;
using CoffeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeManagement.Repositories.VoucherRepo
{
    public class VoucherRepository : SqlServerRepository<Voucher>, IVoucherRepository
    {
        private readonly DBContext _context;
        private readonly DbSet<Voucher> _dbSet;

        public VoucherRepository(DBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<Voucher>();
        }

        public Task<Voucher?> GetByCode(string code)
        {
            return _dbSet.Where(v => v.Code == code).FirstOrDefaultAsync();
        }

        public IQueryable<Voucher> GetQueryable()
        {
            return _dbSet.AsQueryable();
        }
    }
}
