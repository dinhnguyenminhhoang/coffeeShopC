namespace CoffeManagement.DTO.Summary
{
    public class SummaryFilter
    {
        public int? BranchId { get; set; }

        public int Limit { get; set; } = 8;

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
