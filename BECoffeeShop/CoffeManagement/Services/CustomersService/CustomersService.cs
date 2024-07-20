using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Branches;
using CoffeManagement.DTO.Customers;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models;
using CoffeManagement.Repositories.CustomerRepo;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.CustomersService
{
    public class CustomersService:ICustomersService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly ICustomerRepository _customersRepository;

        public CustomersService(IHttpContextAccessor httpContextAccessor, IMapper mapper, ICustomerRepository customersRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _customersRepository = customersRepository;
        }

        public async Task<PagingListModel<CustomersResponse>> GetListCustomers([FromQuery] PagingDTO pagingDto)
        {
            var customerhQueryable = _customersRepository.GetQueryable();

            var pagingList = new PagingListModel<Customer>(customerhQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<CustomersResponse>>(pagingList);

            return result;
        }
        public async Task<int> CreateCustomers(CreateCustomerRequest request)
        {
            var customers = _mapper.Map<Customer>(request);

            await _customersRepository.Add(customers);

            return customers.Id;
        }
        public async Task<int> UpdateCustomers(UpdateCustomerRequest request)
        {
            var customers = _mapper.Map<Customer>(request);

            await _customersRepository.Update(customers);

            return customers.Id;
        }

        public async Task<CustomersDetailResponse> GetCustomersDetail(int id)
        {
            var customer = await _customersRepository.GetById(id);

            if (customer == null) throw new NotFoundException("Not found customers.");

            var customerDetail = _mapper.Map<CustomersDetailResponse>(customer);

            return customerDetail;
        }

        public async Task<int> DeleteCustomers(int id)
        {
            var customers = await _customersRepository.GetById(id);

            if (customers == null) throw new NotFoundException("Not found customers.");

            await _customersRepository.Remove(id);

            return customers.Id;
        }
    }
}
