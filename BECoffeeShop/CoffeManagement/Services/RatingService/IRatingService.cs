using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Rating;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.RatingService
{
    public interface IRatingService
    {
        Task<int> CreateDrinksRating(CreateDrinkRatingRequest request);
        Task<int> UpdateDrinksRating(UpdateDrinkRatingRequest request);
        Task<int> FeedbackDrinksRating(FeedbackDrinkRatingRequest request);
        Task<PagingListModel<DrinkRatingResponse>> DrinksRatingList(int drinkId, PagingDTO pagingDTO);
        Task<DrinkRatingDetailResponse> DetailDrinksRating(int id);
    }
}
