using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Voucher;

namespace CoffeManagement.Services.VoucherService
{
    public interface IVoucherService
    {
        Task<int> CreateVoucher(CreateVoucherRequest request);
        Task<int> UpdateVoucher(UpdateVoucherRequest request);
        Task<int> DeleteVoucher(int id);
        Task<PagingListModel<VoucherResponse>> GetListVoucher(PagingDTO pagingDTO);
        Task<VoucherDetailResponse> GetDetailVoucher(int id);
    }
}
