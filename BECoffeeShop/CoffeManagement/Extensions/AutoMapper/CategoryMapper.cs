using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile :Profile
    {
        private void LoadCategoryMapperProfile()
        {
            CreateMap<Models.Category, DTO.Category.CategoryResponse>()
                .ForMember(dest => dest.AmountDrink, otp => otp.MapFrom(src => src.Drinks.Count()));
            CreateMap<Models.Category, DTO.Category.CategoryDetailResponse>()
                .ForMember(dest => dest.AmountDrink, otp => otp.MapFrom(src => src.Drinks.Count()));
            CreateMap<Common.Pagging.PagingListModel<Models.Category>, Common.Pagging.PagingListModel<DTO.Category.CategoryResponse>>();
            CreateMap<DTO.Category.CreateCategoryRequest, Models.Category>();
            CreateMap<DTO.Category.UpdateCategoryRequest, Models.Category>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
