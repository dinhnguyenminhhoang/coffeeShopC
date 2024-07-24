using AutoMapper;
using CoffeManagement.Models.Enum;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadOrderMapperProfile()
        {
            CreateMap<DTO.Order.CustomerCreateOrderRequest, Models.Order>()
                .ForMember(dest => dest.OrderDetails, otp => otp.MapFrom(src => src.OrderDetails));
            CreateMap<DTO.Order.CustomerCreateOrderDetail, Models.OrderDetail>();
            CreateMap<Models.Order, DTO.Order.CustomerOrderHistoryResponse>();
            CreateMap<Common.Pagging.PagingListModel<Models.Order>, Common.Pagging.PagingListModel<DTO.Order.CustomerOrderHistoryResponse>>();
            CreateMap<Models.Order, DTO.Order.CustomerOrderDetailResponse>()
                .ForMember(dest => dest.OrderDetails, otp => otp.MapFrom(src => src.OrderDetails))
                .ForMember(dest => dest.Branch, otp => otp.MapFrom(src => new DTO.Order.CustomerOrderDetail_Branch()
                {
                    Id = src.Branch.Id,
                    Name = src.Branch.Name,
                    Address = src.Branch.Address,

                }));
            CreateMap<Models.OrderDetail, DTO.Order.CustomerOrderDetail_ItemDetail>()
                .ForMember(dest => dest.Drink, otp => otp.MapFrom(src => new DTO.Order.CustomerOrderDetail_ItemDetail_Drink()
                {
                    Id = src.Drink.Id,
                    Name = src.Drink.Name,
                    Description = src.Drink.Description,
                    Size = src.DrinkSize.Size,
                    Price = src.Price / src.Quantity,
                }));

            //--------------------------------------------

            CreateMap<DTO.Order.StaffCreateOrderRequest, Models.Order>()
                .ForMember(dest => dest.OrderDetails, otp => otp.MapFrom(src => src.OrderDetails));
            CreateMap<DTO.Order.StaffCreateOrderDetail, Models.OrderDetail>();
            CreateMap<DTO.Order.StaffUpdateOrderRequest, Models.Order>()
                .ForMember(dest => dest.OrderDetails, opt => opt.Ignore());
            CreateMap<DTO.Order.StaffUpdateOrderDetail, Models.OrderDetail>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Models.Order, DTO.Order.StaffOrderResponse>()
                .ForMember(dest => dest.StaffName, otp => otp.MapFrom(src => src.Staff != null ? src.Staff.FullName : null))
                .ForMember(dest => dest.CanceledBy, otp => otp.MapFrom(src =>
                            !src.Status.Equals(OrderStatus.ODR_CANL.ToString())
                            ? null
                            : src.StaffCanceled != null ? src.StaffCanceled.FullName : "Customer"
                 ));
            CreateMap<Common.Pagging.PagingListModel<Models.Order>, Common.Pagging.PagingListModel<DTO.Order.StaffOrderResponse>>();
        }
    }
}
