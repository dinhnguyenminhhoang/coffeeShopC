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
            var branchQueryable = _branchRepository.GetQueryable();

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
            var branches = _mapper.Map<Branch>(request);

            await _branchRepository.Update(branches);

            return branches.Id;
        }

        public async Task<BranchesDetailReponse> GetBranchesDetail(int id)
        {
            var branch = await _branchRepository.GetById(id);

            if (branch == null) throw new NotFoundException("Not found branches.");

            var branchDetail = _mapper.Map<BranchesDetailReponse>(branch);

            return branchDetail;
        }

        public async Task<int> DeleteBranches(int id)
        {
            var branch = await _branchRepository.GetById(id);

            if (branch == null) throw new NotFoundException("Not found branch.");

            await _branchRepository.Remove(id);

            return branch.Id;
        }
    }
}
