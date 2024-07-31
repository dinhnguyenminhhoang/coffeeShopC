using AutoMapper;
using Azure.Core;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Account;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Staff;
using CoffeManagement.Models;
using CoffeManagement.Models.Enum;
using CoffeManagement.Repositories.CustomerRepo;
using CoffeManagement.Repositories.StaffRepo;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.StaffService
{
    public class StaffService : IStaffService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IStaffRepository _staffRepository;
        private readonly IAccountRepository _accountRepository;

        public StaffService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IStaffRepository staffsRepository, IAccountRepository accountRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _staffRepository = staffsRepository;
            _accountRepository = accountRepository;
        }

        public async Task<PagingListModel<StaffsResponse>> GetListStaff([FromQuery] PagingDTO pagingDto)
        {
            var staffQueryable = _staffRepository.GetQueryable().Where(s => s.IsDeleted == false);

            var pagingList = new PagingListModel<Staff>(staffQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<StaffsResponse>>(pagingList);

            return result;
        }

        public async Task<int> CreateStaff(CreateStaffRequest request)
        {
            var staffExits = await _staffRepository.GetByPhone(request.Phone);
            if (staffExits != null) throw new ConflictException("This phone number already used, please use another phone number.");

            if (request.Account == null)
            {
                var staff = _mapper.Map<Staff>(request);

                await _staffRepository.Add(staff);

                return staff.Id;
            }
            else
            {
                var accountExits = await _accountRepository.GetAccountCustomerByUsername(request.Account.Username);
                if (accountExits != null) throw new ConflictException("This username already used, please use another username.");

                var staff = _mapper.Map<Staff>(request);

                await _accountRepository.Add(new()
                {
                    Username = request.Account.Username,
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Account.Password),
                    Type = AccountType.ACC_STA.ToString(),
                    Staff = new Staff[] { staff }
                });

                return staff.Id;
            }
        }

        public async Task<int> UpdateStaff(UpdateStaffsRequest request)
        {
            var existedStaff = await _staffRepository.GetById(request.Id);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found staff.");

            _mapper.Map(request, existedStaff);

            await _staffRepository.Update(existedStaff);

            return existedStaff.Id;
        }

        public async Task<StaffsDetailResponse> GetStaffDetail(int id)
        {
            var existedStaff = await _staffRepository.GetById(id);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found staff.");

            var staffDetail = _mapper.Map<StaffsDetailResponse>(existedStaff);
            var account = await _accountRepository.GetById(staffDetail.AccountId);
            if (account != null) staffDetail.Account = _mapper.Map<AccountResponse>(account);

            return staffDetail;
        }

        public async Task<int> DeleteStaff(int id)
        {
            var existedStaff = await _staffRepository.GetById(id);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found staff.");

            existedStaff.IsDeleted = true;
            await _staffRepository.Update(existedStaff);

            return existedStaff.Id;
        }

        public async Task<int> AddAccountForStaff(CreateAccountForStaffRequest request)
        {
            var existedStaff = await _staffRepository.GetById(request.StaffId);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");
            if (existedStaff.AccountId != null && existedStaff.AccountId > 0) throw new ConflictException("Staff already have Account.");

            var accountExits = await _accountRepository.GetAccountCustomerByUsername(request.Username);
            if (accountExits != null) throw new ConflictException("This username already used, please use another username.");

            var account = await _accountRepository.Add(new()
            {
                Username = request.Username,
                HashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Type = AccountType.ACC_STA.ToString(),
            });

            existedStaff.AccountId = account.Id;
            existedStaff.UpdatedAt = DateTime.Now;
            await _staffRepository.Update(existedStaff);

            return account.Id;
        }

        public async Task<int> UpdateAccountOfStaff(UpdateAccountOfStaffRequest request)
        {
            var existedStaff = await _staffRepository.GetById(request.StaffId);
            if (existedStaff == null || existedStaff.IsDeleted == true) throw new NotFoundException("Not found Staff.");
            if (existedStaff.Account == null) throw new ConflictException("Staff don't have Account.");

            var accountExits = await _accountRepository.GetAccountCustomerByUsername(request.Username);
            if (accountExits != null) throw new ConflictException("This username already used, please use another username.");

            var account = existedStaff.Account;
            _mapper.Map(request, account);

            await _accountRepository.Update(account);

            return account.Id;
        }
    }
}
