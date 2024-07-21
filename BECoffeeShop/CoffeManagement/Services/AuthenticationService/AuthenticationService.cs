using CoffeManagement.Common.Exceptions;
using CoffeManagement.DTO.Authentication;
using CoffeManagement.Infrastructure.Jwt;
using CoffeManagement.Models;
using CoffeManagement.Models.Enum;
using CoffeManagement.Repositories.CustomerRepo;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace CoffeManagement.Services.AccountService
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly HttpContext _httpContext;
        private readonly IAccountRepository _accountRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly JwtUtil _jwtUtil;
        private readonly string _staffAccessTokenExpired;
        private readonly string _customerAccessTokenExpired;

        public AuthenticationService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IAccountRepository accountRepository, ICustomerRepository customerRepository, JwtUtil jwtUtil)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _accountRepository = accountRepository;
            _customerRepository = customerRepository;
            _jwtUtil = jwtUtil;

            _staffAccessTokenExpired = configuration.GetValue<string>("Jwt:StaffAccessTokenExpired") ?? string.Empty;
            _staffAccessTokenExpired = configuration.GetValue<string>("Jwt:CustomerAccessTokenExpired") ?? string.Empty;
        }

        public async Task<LoginResponse> CustomerLogin(LoginRequest request)
        {
            // Check login info

            var account = await _accountRepository.GetAccountCustomerByUsername(request.Username);

            if (account == null)
                throw new UnauthorizedException("Login info incorrect");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, account.HashedPassword))
                throw new UnauthorizedException("Login info incorrect!");

            // Generate access token
            var customer = account.Customers.FirstOrDefault();

            var claims = new Claim[] {
                new(AppClaimTypes.Username, account.Username),
                new(AppClaimTypes.FullName, customer?.FullName ?? string.Empty),
                new(AppClaimTypes.Phone, customer ?.Phone ?? string.Empty),
                new(ClaimTypes.Role, AuthRole.ROLE_CUSTOMER.ToString())
            };

            var accessToken = _jwtUtil.GenerateToken(claims, "2d");

            return new LoginResponse() { AccessToken = accessToken };
        }

        public async Task<int> CustomerRegister(CustomerRegisterRequest request)
        {
            // Check username or phone number already used?
            var accountExits = await _accountRepository.GetAccountCustomerByUsername(request.Username);
            if (accountExits != null) throw new ConflictException("This username already used, please use another username.");

            var customerExits = await _customerRepository.GetByPhone(request.Phone);
            if (customerExits != null) throw new ConflictException("This phone number already used, please use another phone number.");

            // Create new customer with account
            var account = await _accountRepository.Add(new()
            {
                Username = request.Username,
                HashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Customers = new Customer[]
                {
                    new()
                    {
                        Phone = request.Phone.Trim(),
                        Address = request.Address.Trim(),
                    }
                }
            });

            return account.Customers.FirstOrDefault()?.Id ?? 0;
        }

        public async Task<LoginResponse> StaffLogin(LoginRequest request)
        {
            // Check login info

            var account = await _accountRepository.GetAccountStaffByUsername(request.Username);

            if (account == null)
                throw new UnauthorizedException("Login info incorrect!");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, account.HashedPassword))
                throw new UnauthorizedException("Login info incorrect!");

            // Generate access token
            var staff = account.Staff.FirstOrDefault();

            var claims = new Claim[] {
                new(AppClaimTypes.Username, account.Username),
                new(AppClaimTypes.FullName, staff?.FullName ?? string.Empty),
                new(AppClaimTypes.Phone, staff ?.Phone ?? string.Empty),
                new(ClaimTypes.Role, staff?.Position ?? StaffPosition.POS_STAFF.ToString())
            };

            var accessToken = _jwtUtil.GenerateToken(claims, "2d");

            return new LoginResponse() { AccessToken = accessToken };
        }

    }
}
