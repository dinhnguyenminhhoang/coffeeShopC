using CoffeManagement.Models;

namespace CoffeManagement.Repositories.RatingRepo
{
    public interface IDrinkRatingRepository: IRepository<DrinkRating>, IRepositoryQueryable<DrinkRating>
    {
    }
}
