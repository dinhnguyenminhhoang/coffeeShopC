using AutoMapper;
using CoffeManagement.Common.Exceptions;
using CoffeManagement.Common.Pagging;
using CoffeManagement.DTO.Branches;
using CoffeManagement.DTO.Paging;
using CoffeManagement.Models;
using CoffeManagement.Repositories.BranchRepo;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.BrachService
{
    public class BranchService : IBranchService
    {
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IBranchRepository _branchRepository;

        public BranchService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IBranchRepository branchesRepository)
        {
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
            _branchRepository = branchesRepository;
        }

        public async Task<PagingListModel<BranchesResponse>> GetListBranches([FromQuery] PagingDTO pagingDto)
        {
            var branchQueryable = _branchRepository.GetQueryable().Where(b => b.IsDeleted == false);

            var pagingList = new PagingListModel<Branch>(branchQueryable, pagingDto.PageIndex, pagingDto.PageSize);

            var result = _mapper.Map<PagingListModel<BranchesResponse>>(pagingList);
            return result;
        }
        public async Task<int> CreateBranches(CreateBranchesRequest request)
        {
            var branches = _mapper.Map<Branch>(request);

            await _branchRepository.Add(branches);

            return branches.Id;
        }
        public async Task<int> UpdateBranches(UpdateBranchesRequest request)
        {
            var existedBranch = await _branchRepository.GetById(request.Id);
            if (existedBranch == null || existedBranch.IsDeleted == true) throw new NotFoundException("Not found branches.");

            _mapper.Map(request, existedBranch);
            existedBranch.UpdatedAt = DateTime.Now;
            await _branchRepository.Update(existedBranch);

            return existedBranch.Id;
        }

        public async Task<BranchesDetailReponse> GetBranchesDetail(int id)
        {
            var existedBranch = await _branchRepository.GetById(id);
            if (existedBranch == null || existedBranch.IsDeleted == true) throw new NotFoundException("Not found branches.");

            var branchDetail = _mapper.Map<BranchesDetailReponse>(existedBranch);

            return branchDetail;
        }

        public async Task<int> DeleteBranches(int id)
        {
            var existedBranch = await _branchRepository.GetById(id);
            if (existedBranch == null || existedBranch.IsDeleted == true) throw new NotFoundException("Not found branch.");

            existedBranch.IsDeleted = true;
            existedBranch.UpdatedAt = DateTime.Now;
            await _branchRepository.Update(existedBranch);

            return existedBranch.Id;
        }
    }
}
