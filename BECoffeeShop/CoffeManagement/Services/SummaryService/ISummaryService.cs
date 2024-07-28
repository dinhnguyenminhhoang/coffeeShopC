using CoffeManagement.DTO.Summary;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Services.SummaryService
{
    public interface ISummaryService
    {
        Task<object> GetParameters();
        Task<object> GetBestSellDrinks_Table(SummaryFilter filter);
        Task<object> GetBestSellStaff_Table(SummaryFilter filter);
        Task<object> GetRecentOrders_Table(SummaryFilter filter);
        Task<object> GetAmountSoldOfCategory_Chart(SummaryFilter filter);
        Task<object> GetOverview_Chart(SummaryFilter filter);
        Task<object> GetOrders_Chart(SummaryFilter filter);
        Task<object> GetRevenueAndProfit_Chart(SummaryFilter filter);
    }
}
