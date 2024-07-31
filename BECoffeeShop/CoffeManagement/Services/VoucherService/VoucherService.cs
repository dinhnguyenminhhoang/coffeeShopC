using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Voucher;
using CoffeManagement.Models;
using CoffeManagement.Models.Enum;
using CoffeManagement.Repositories.VoucherRepo;

namespace CoffeManagement.Services.VoucherService
{
    public class VoucherService : IVoucherService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IVoucherRepository _voucherRepository;

        public VoucherService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IVoucherRepository voucherRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _voucherRepository = voucherRepository;
        }

        public async Task<int> CreateVoucher(CreateVoucherRequest request)
        {
            var existedVocher = await _voucherRepository.GetByCode(request.Code);
            if (existedVocher != null) throw new BadRequestException("This Code already existed.");

            var voucher = _mapper.Map<Voucher>(request);
            voucher.VoucherApplies = request.ListDrink.Select(drinkId => new VoucherApply { DrinkId = drinkId }).ToList();

            await _voucherRepository.Add(voucher);

            return voucher.Id;
        }

        public async Task<int> UpdateVoucher(UpdateVoucherRequest request)
        {
            var existedVocher = await _voucherRepository.GetById(request.Id);
            if (existedVocher == null) throw new NotFoundException("Not found Voucher");
            if (existedVocher.Staus.Equals(VoucherStatus.VOUC_USING.ToString())) throw new ConflictException("Cannot Update voucher. Because this Vocher is using");

            var otherExistedVocher = await _voucherRepository.GetByCode(request.Code);
            if (otherExistedVocher != null && otherExistedVocher.Id != existedVocher.Id) throw new BadRequestException("This Code already existed.");

            foreach (var drinkId in request.ListDrink)
            {
                var existedVoucherApply = existedVocher.VoucherApplies.Where(av => av.DrinkId == drinkId).FirstOrDefault();
                if (existedVoucherApply == null)
                {
                    existedVocher.VoucherApplies.Add(new VoucherApply { DrinkId = drinkId });
                }
            }

            foreach (var voucherApply in existedVocher.VoucherApplies.ToList())
            {
                if (!request.ListDrink.Any(drinkId => drinkId == voucherApply.DrinkId))
                {
                    existedVocher.VoucherApplies.Remove(voucherApply);
                }
            }

            _mapper.Map(request, existedVocher);
            await _voucherRepository.Update(existedVocher);

            return existedVocher.Id;
        }

        public async Task<int> DeleteVoucher(int id)
        {
            var existedVocher = await _voucherRepository.GetById(id);
            if (existedVocher == null) throw new NotFoundException("Not found Voucher");
            if (existedVocher.Staus.Equals(VoucherStatus.VOUC_USING.ToString())) throw new ConflictException("Cannot Delete voucher. Because this Vocher is using");

            await _voucherRepository.Remove(id);

            return existedVocher.Id;
        }

        public async Task<VoucherDetailResponse> GetDetailVoucher(int id)
        {
            var existedVocher = await _voucherRepository.GetById(id);
            if (existedVocher == null) throw new NotFoundException("Not found Voucher");

            var voucherDetail = _mapper.Map<VoucherDetailResponse>(existedVocher);

            return voucherDetail;
        }

        public async Task<PagingListModel<VoucherResponse>> GetListVoucher(PagingDTO pagingDTO, ListVoucherFilter filter)
        {
            var voucherQueryable = _voucherRepository.GetQueryable();

            if(filter != null)
            {
                if (!string.IsNullOrEmpty(filter.Code))
                {
                    voucherQueryable = voucherQueryable.Where(v => v.Code == filter.Code);
                }
            }

            var pagingList = new PagingListModel<Voucher>(voucherQueryable, pagingDTO.PageIndex, pagingDTO.PageSize);
            var result = _mapper.Map<PagingListModel<VoucherResponse>>(pagingList);

            return result;
        }
    }
}
