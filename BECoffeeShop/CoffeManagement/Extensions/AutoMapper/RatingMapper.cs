using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public sealed partial class AutoMapperProfile : Profile
    {
        private void LoadRatingMapperProfile()
        {

            CreateMap<Models.DrinkRating, DTO.Rating.DrinkRatingResponse>()
                .ForMember(dest => dest.Customer, otp => otp.MapFrom(src => src.Order.Customer))
                .ForMember(dest => dest.HasFeedback, otp => otp.MapFrom(src => (src.FeedbackStaffId != null && src.FeedbackStaffId > 0)));
            CreateMap<Models.DrinkRating, DTO.Rating.DrinkRatingDetailResponse>()
                .ForMember(dest => dest.Drink, otp => otp.MapFrom(src => src.Drink))
                .ForMember(dest => dest.Customer, otp => otp.MapFrom(src => src.Order.Customer))
                .ForMember(dest => dest.Feedback, otp => otp.MapFrom(src => new DTO.Rating.DrinkRatingDetail_Feedback()
                {
                    FeedbackContent = src.Feedback,
                    FeedbackAt = src.FeedbackAt,
                    Staff = new DTO.Rating.DrinkRatingDetail_Staff()
                    {
                        Id = src.FeedbackStaff.Id,
                        FullName = src.FeedbackStaff.FullName,
                    }
                }));
            CreateMap<Common.Pagging.PagingListModel<Models.DrinkRating>, Common.Pagging.PagingListModel<DTO.Rating.DrinkRatingResponse>>();
            CreateMap<DTO.Rating.CreateDrinkRatingRequest, Models.DrinkRating>();
            CreateMap<DTO.Rating.UpdateDrinkRatingRequest, Models.DrinkRating>();
            CreateMap<DTO.Rating.FeedbackDrinkRatingRequest, Models.DrinkRating>();
            CreateMap<Models.Drink, DTO.Rating.DrinkRatingDetail_Drink>();
            CreateMap<Models.Customer, DTO.Rating.DrinkRatingDetail_Customer>();
            CreateMap<Models.Staff, DTO.Rating.DrinkRatingDetail_Staff>();
        }
    }
}
