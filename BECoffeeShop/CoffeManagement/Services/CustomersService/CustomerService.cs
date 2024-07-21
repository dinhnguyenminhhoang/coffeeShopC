using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Account;
using CoffeManagement.DTO.Authentication;
using CoffeManagement.DTO.Branches;
using CoffeManagement.DTO.Customers;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models;
using CoffeManagement.Repositories.CustomerRepo;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.CustomersService
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

        public async Task<PagingListModel<CustomersResponse>> GetListCustomers([FromQuery] PagingDTO pagingDto)
        {
            var customerhQueryable = _customerRepository.GetQueryable().Where(c => c.IsDeleted == false);

            var pagingList = new PagingListModel<Customer>(customerhQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<CustomersResponse>>(pagingList);

            return result;
        }
        public async Task<int> CreateCustomers(CreateCustomerRequest request)
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
                    Customers = new Customer[] { customer }
                });

                return customer.Id;
            }
        }
        public async Task<int> UpdateCustomers(UpdateCustomerRequest request)
        {
            var existedCustomer = await _customerRepository.GetById(request.Id);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            _mapper.Map(request, existedCustomer);
            existedCustomer.UpdatedAt = DateTime.Now;
            await _customerRepository.Update(existedCustomer);

            return existedCustomer.Id;
        }

        public async Task<CustomersDetailResponse> GetCustomersDetail(int id)
        {
            var existedCustomer = await _customerRepository.GetById(id);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            var customerDetail = _mapper.Map<CustomersDetailResponse>(existedCustomer);
            var account = await _accountRepository.GetById(customerDetail.AccountId);
            if (account != null) customerDetail.Account = _mapper.Map<AccountResponse>(account);

            return customerDetail;
        }

        public async Task<int> DeleteCustomers(int id)
        {
            var existedCustomer = await _customerRepository.GetById(id);
            if (existedCustomer == null || existedCustomer.IsDeleted == true) throw new NotFoundException("Not found customers.");

            existedCustomer.IsDeleted = true;
            existedCustomer.UpdatedAt = DateTime.Now;
            await _customerRepository.Update(existedCustomer);

            return existedCustomer.Id;
        }
    }
}
