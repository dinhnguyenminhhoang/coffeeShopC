using CoffeManagement.Common.Exceptions;
using CoffeManagement.DTO.Authentication;
using CoffeManagement.Infrastructure.Email;
using CoffeManagement.Infrastructure.Email.Models;
using CoffeManagement.Infrastructure.Email.Templates;
using CoffeManagement.Infrastructure.Jwt;
using CoffeManagement.Models.Enum;
using CoffeManagement.Repositories.CustomerRepo;
using System.Security.Claims;

namespace CoffeManagement.Services.AccountService
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly HttpContext _httpContext;
        private readonly IAccountRepository _accountRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IEmailService _emailService;
        private readonly JwtUtil _jwtUtil;
        private readonly string _staffAccessTokenExpired;
        private readonly string _customerAccessTokenExpired;
        private readonly string _resetPasswordTokenExpired;
        private readonly string _frontendBaseUrl;

        public AuthenticationService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IAccountRepository accountRepository, ICustomerRepository customerRepository, IEmailService emailService, JwtUtil jwtUtil)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _accountRepository = accountRepository;
            _customerRepository = customerRepository;
            _emailService = emailService;
            _jwtUtil = jwtUtil;

            _staffAccessTokenExpired = configuration.GetValue<string>("Jwt:StaffAccessTokenExpired") ?? string.Empty;
            _customerAccessTokenExpired = configuration.GetValue<string>("Jwt:CustomerAccessTokenExpired") ?? string.Empty;
            _resetPasswordTokenExpired = configuration.GetValue<string>("Jwt:ResetPasswordTokenExpired") ?? string.Empty;
            _frontendBaseUrl = configuration.GetValue<string>("Frontend:BaseUrl") ?? string.Empty;
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

            var accessToken = _jwtUtil.GenerateToken(claims, _customerAccessTokenExpired);

            return new LoginResponse() { AccessToken = accessToken };
        }

        public async Task<int> CustomerRegister(CustomerRegisterRequest request)
        {
            // Check username, phone number or email already used?
            var accountExits = await _accountRepository.GetAccountByUsername(request.Username);
            if (accountExits != null) throw new ConflictException("This username already used, please use another username.");

            var customerExits = await _customerRepository.GetByPhone(request.Phone);
            if (customerExits != null) throw new ConflictException("This phone number already used, please use another phone number.");

            customerExits = await _customerRepository.GetByEmail(request.Email);
            if (customerExits != null) throw new ConflictException("This Email already used, please use another Email.");

            // Create new customer with account
            var account = await _accountRepository.Add(new()
            {
                Username = request.Username,
                HashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Customers = new Models.Customer[]
                {
                    new()
                    {
                        Phone = request.Phone.Trim(),
                        Email = request.Email,
                        Address = request.Address.Trim(),
                    }
                }
            });

            return account.Customers.FirstOrDefault()?.Id ?? 0;
        }

        public async Task<int> CustomerForgotPassword(CustomerForgotPasswordRequest request)
        {
            // Check existed customer and customer have a account?
            var customerExits = await _customerRepository.GetByEmail(request.Email);
            if (customerExits == null) throw new ConflictException("This Email not registered on system");
            if (customerExits.Account == null) throw new ConflictException("This Customer not have any account");


            // Generate token
            var claims = new Claim[] {
                new(AppClaimTypes.FullName, customerExits.FullName ?? string.Empty),
                new(AppClaimTypes.Phone, customerExits.Phone ?? string.Empty),
                new(AppClaimTypes.ResetPassword, "true"),
                new(AppClaimTypes.AccountType, AccountType.ACC_CUS.ToString()),
            };

            var token = _jwtUtil.GenerateToken(claims, _resetPasswordTokenExpired);

            // Send email
            await _emailService.SendEmailAsync(new()
            {
                To = request.Email,
                Subject = "Reset Password",
                Model = new ResetPasswordModel
                {
                    SiteUrl = _frontendBaseUrl,
                    FullName = customerExits.FullName,
                    Token = token,
                },
                TemplateName = EmailTemplates.ResetPassword
            });

            return customerExits.Id;
        }

        public async Task<int> CustomerResetPassword(CustomerResetPasswordRequest request)
        {
            var isResetPassword = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.ResetPassword)?.Value?.Equals("true") ?? false;
            if (!isResetPassword) throw new BadRequestException("Invalid Token");

            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;

            // find Customer
            var customerExits = await _customerRepository.GetByPhone(phone);
            if (customerExits == null) throw new ConflictException("This Customer not existed on system");


            // reset passowrd
            customerExits.Account.HashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
            await _customerRepository.Update(customerExits);

            return customerExits.Id;
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
                new(ClaimTypes.Role, GetRoleByPosition(staff?.Position).ToString())
            };

            var accessToken = _jwtUtil.GenerateToken(claims, _staffAccessTokenExpired);

            return new LoginResponse() { AccessToken = accessToken };
        }


        private AuthRole GetRoleByPosition(string? position)
        {
            if(position != null)
            {
                if (position.Equals(StaffPosition.POS_STAFF.ToString()))
                    return AuthRole.ROLE_STAFF;
                else if (position.Equals(StaffPosition.POS_ADMIN.ToString()))
                    return AuthRole.ROLE_ADMIN;
            }

            return AuthRole.ROLE_STAFF;
        }
    }
}
