using CoffeManagement.Models.Enum;
using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Order
{
    public class StaffUpdateOrderRequest
    {
        public int Id { get; set; }

        public int? BranchId { get; set; }

        public int? CustomerId { get; set; }

        public string? PaymentMethod { get; set; }

        public string? CustomerNote { get; set; }

        public string? StaffNote { get; set; }

        public IEnumerable<StaffUpdateOrderDetail>? OrderDetails { get; set; } = new List<StaffUpdateOrderDetail>();

        [JsonIgnore]
        public double TotalPrice { get => OrderDetails?.Sum(od => od.Price) ?? 0; }

        [JsonIgnore]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }

    public class StaffUpdateOrderDetail
    {
        public int DrinkId { get; set; }

        public int DrinkSizeId { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }
    }
}
