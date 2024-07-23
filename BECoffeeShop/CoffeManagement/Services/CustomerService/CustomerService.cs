using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Account;
using CoffeManagement.DTO.Customer;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Infrastructure.Jwt;
using CoffeManagement.Models;
using CoffeManagement.Models.Enum;
using CoffeManagement.Repositories.CustomerRepo;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.CustomerService
{
    public class CustomerService : ICustomerService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly ICustomerRepository _customerRepository;
        private readonly IAccountRepository _accountRepository;

        public CustomerService(IHttpContextAccessor httpContextAccessor, IMapper mapper, ICustomerRepository customersRepository, IAccountRepository accountRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _customerRepository = customersRepository;
            _accountRepository = accountRepository;
        }

        public async Task<PagingListModel<CustomersResponse>> GetListCustomer([FromQuery] PagingDTO pagingDto)
        {
            var customerhQueryable = _customerRepository.GetQueryable().Where(c => c.IsDeleted == false);

            var pagingList = new PagingListModel<Customer>(customerhQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<CustomersResponse>>(pagingList);

            return result;
        }

        public async Task<int> CreateCustomer(CreateCustomerRequest request)
        {
            var customerExits = await _customerRepository.GetByPhone(request.Phone);
            if (customerExits != null) throw new ConflictException("This phone number already used, please use another phone number.");

            if (request.Account == null)
            {
                var customer = _mapper.Map<Customer>(request);

                await _customerRepository.Add(customer);

                return customer.Id;
            }
            else
            {
                var accountExits = await _accountRepository.GetAccountCustomerByUsername(request.Account.Username);
                if (accountExits != null) throw new ConflictException("This username already used, please use another username.");

                var customer = _mapper.Map<Customer>(request);

                await _accountRepository.Add(new()
                {
                    Username = request.Account.Username,
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Account.Password),
                    Type = AccountType.ACC_CUS.ToString(),
                    Customers = new Customer[] { customer }
                });

                return customer.Id;
            }
        }

        public async Task<int> UpdateCustomer(UpdateCustomerRequest request)
        {
            var existedCustomer = await _customerRepository.GetById(request.Id);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            _mapper.Map(request, existedCustomer);
            existedCustomer.UpdatedAt = DateTime.Now;
            await _customerRepository.Update(existedCustomer);

            return existedCustomer.Id;
        }

        public async Task<CustomersDetailResponse> GetCustomerDetail(int id)
        {
            var existedCustomer = await _customerRepository.GetById(id);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            var customerDetail = _mapper.Map<CustomersDetailResponse>(existedCustomer);
            var account = await _accountRepository.GetById(customerDetail.AccountId);
            if (account != null) customerDetail.Account = _mapper.Map<AccountResponse>(account);

            return customerDetail;
        }

        public async Task<int> DeleteCustomer(int id)
        {
            var existedCustomer = await _customerRepository.GetById(id);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            existedCustomer.IsDeleted = true;
            existedCustomer.UpdatedAt = DateTime.Now;
            await _customerRepository.Update(existedCustomer);

            return existedCustomer.Id;
        }

        public async Task<int> AddAccountForCustomers(CreateAccountForCustomerRequest request)
        {
            var existedCustomer = await _customerRepository.GetById(request.CustomerId);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");
            if (existedCustomer.AccountId !=  null && existedCustomer.AccountId > 0) throw new ConflictException("Customers already have Account.");

            var accountExits = await _accountRepository.GetAccountCustomerByUsername(request.Username);
            if (accountExits != null) throw new ConflictException("This username already used, please use another username.");

            var account = await _accountRepository.Add(new()
            {
                Username = request.Username,
                HashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Type = AccountType.ACC_CUS.ToString(),
            });

            existedCustomer.AccountId = account.Id;
            existedCustomer.UpdatedAt = DateTime.Now;
            await _customerRepository.Update(existedCustomer);

            return account.Id;
        }

        public async Task<int> UpdateAccountOfCustomers(UpdateAccountOfCustomerRequest request)
        {
            var existedCustomer = await _customerRepository.GetById(request.CustomerId);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");
            if (existedCustomer.Account == null) throw new ConflictException("Customers don't have Account.");

            var accountExits = await _accountRepository.GetAccountCustomerByUsername(request.Username);
            if (accountExits != null) throw new ConflictException("This username already used, please use another username.");

            var account = existedCustomer.Account;
            _mapper.Map(request, account);

            await _accountRepository.Update(account);

            return account.Id;
        }

        public async Task<CustomersDetailResponse> GetProfileCustomer()
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;

            var existedCustomer = await _customerRepository.GetByPhone(phone);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            var customerDetail = _mapper.Map<CustomersDetailResponse>(existedCustomer);
            var account = await _accountRepository.GetById(customerDetail.AccountId);
            if (account != null) customerDetail.Account = _mapper.Map<AccountResponse>(account);

            return customerDetail;
        }

        public async Task<int> UpdateProfileCustomer(UpdateProfileCustomerRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;

            var existedCustomer = await _customerRepository.GetByPhone(phone);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            _mapper.Map(request, existedCustomer);
            await _customerRepository.Update(existedCustomer);

            return existedCustomer.Id;
        }

        public async Task<int> CustomerChangePassword(CustomerChangePasswordRequest request)
        {
            var phone = _httpContext?.User.Claims.FirstOrDefault(c => c.Type == AppClaimTypes.Phone)?.Value;

            var existedCustomer = await _customerRepository.GetByPhone(phone);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");
            if (existedCustomer.Account == null) throw new ConflictException("This Customer not have any account");


            // Compare old password
            if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, existedCustomer.Account.HashedPassword))
                throw new BadRequestException("Old Password incorrect!");

            // Update new Password
            existedCustomer.Account.HashedPassword = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await _customerRepository.Update(existedCustomer);

            return existedCustomer.Id;
        }
    }
}
