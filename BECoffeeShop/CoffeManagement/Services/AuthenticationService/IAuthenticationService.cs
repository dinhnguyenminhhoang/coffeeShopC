using CoffeManagement.DTO.Authentication;

namespace CoffeManagement.Services.AccountService
{
    public interface IAuthenticationService
    {
        Task<LoginResponse> CustomerLogin(LoginRequest loginRequest);
        Task<int> CustomerRegister(CustomerRegisterRequest customerRegisterRequest);
        Task<LoginResponse> StaffLogin(LoginRequest loginRequest);
    }
}
