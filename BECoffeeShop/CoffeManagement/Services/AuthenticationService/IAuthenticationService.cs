using CoffeManagement.DTO.Authentication;

namespace CoffeManagement.Services.AccountService
{
    public interface IAuthenticationService
    {
        Task<LoginResponse> CustomerLogin(LoginRequest request);
        Task<int> CustomerRegister(CustomerRegisterRequest request);
        Task<LoginResponse> StaffLogin(LoginRequest request);
    }
}
