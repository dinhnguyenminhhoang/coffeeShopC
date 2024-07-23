using AutoMapper;

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
                    Address =src.Branch.Address,

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


        }
    }
}
