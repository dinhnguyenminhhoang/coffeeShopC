using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Paging;
using CoffeManagement.DTO.Staffs;
using CoffeManagement.Models;
using CoffeManagement.Repositories.StaffsRepo;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.StaffsService
{
    public class StaffsService:IStaffsService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IStaffsRepository _staffRepository;
        public StaffsService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IStaffsRepository staffsRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _staffRepository = staffsRepository;
        }

        public async Task<PagingListModel<StaffsResponse>> GetListStaffs([FromQuery] PagingDTO pagingDto)
        {
            var staffQueryable = _staffRepository.GetQueryable();

            var pagingList = new PagingListModel<Staff>(staffQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<StaffsResponse>>(pagingList);

            return result;
        }

        public async Task<int> CreateStaffs(CreateStaffRequest request)
        {
            var staffs = _mapper.Map<Staff>(request);

            await _staffRepository.Add(staffs);

            return staffs.Id;
        }

        public async Task<int> UpdateStaffs(UpdateStaffsRequest request)
        {
            var staffs = _mapper.Map<Staff>(request);

            await _staffRepository.Update(staffs);

            return staffs.Id;
        }

        public async Task<StaffsDetailResponse> GetStaffsDetail(int id)
        {
            var staff = await _staffRepository.GetById(id);

            if (staff == null) throw new NotFoundException("Not found Staffs.");

            var staffDetail = _mapper.Map<StaffsDetailResponse>(staff);

            return staffDetail;
        }
        public async Task<int> DeleteStaffs(int id)
        {
            var staffs = await _staffRepository.GetById(id);

            if (staffs == null) throw new NotFoundException("Not found  staff.");

            await _staffRepository.Remove(id);

            return staffs.Id;
        }

    }
}
