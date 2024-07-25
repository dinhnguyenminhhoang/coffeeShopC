using AutoMapper;

namespace CoffeManagement.Extensions.AutoMapper
{
    public partial class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            LoadDrinkMapperProfile();
            LoadBrachMapperProfile();
            LoadStaffMapperProfile();
            LoadCustomerMapperProfile();
            LoadAccountMapperProfile();
            LoadRecipeMapperProfile();
            LoadIngredientMapperProfile();
            LoadOrderMapperProfile();
            LoadRatingMapperProfile();
        }
    }
}
