using AutoMapper;
using CoffeManagement.DTO.Voucher;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        public void LoadVoucherMapperProfile()
        {
            CreateMap<DTO.Voucher.CreateVoucherRequest, Models.Voucher>();
            CreateMap<DTO.Voucher.UpdateVoucherRequest, Models.Voucher>();
            CreateMap<Models.Voucher, DTO.Voucher.VoucherResponse>()
                .ForMember(dest => dest.AmountDrinkApply, otp => otp.MapFrom(src => src.VoucherApplies.Count()));
            CreateMap<Common.Pagging.PagingListModel<Models.Voucher>, Common.Pagging.PagingListModel<DTO.Voucher.VoucherResponse>>();
            CreateMap<Models.Voucher, DTO.Voucher.VoucherDetailResponse>()
                .ForMember(dest => dest.DrinksApply, otp => otp.MapFrom(src => src.VoucherApplies.Select(va => new VoucherDetail_Drink()
                {
                    Id = va.Drink.Id,
                    Name = va.Drink.Name,
                    Image = va.Drink.Image,
                    Description = va.Drink.Description,
                })));
        }
    }
}
