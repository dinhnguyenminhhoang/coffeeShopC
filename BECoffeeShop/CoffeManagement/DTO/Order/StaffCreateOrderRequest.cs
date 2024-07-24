using CoffeManagement.Models.Enum;
using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Order
{
    public class StaffCreateOrderRequest
    {
        public int BranchId { get; set; }

        public int? CustomerId { get; set; }

        public string PaymentMethod { get; set; }

        public string CustomerNote { get; set; }

        public string StaffNote { get; set; }

        public IEnumerable<StaffCreateOrderDetail> OrderDetails { get; set; } = new List<StaffCreateOrderDetail>();

        [JsonIgnore]
        public string Type { get; set; } = OrderType.ODR_OFF.ToString();

        [JsonIgnore]
        public string Status { get; set; } = OrderStatus.ODR_INIT.ToString();

        [JsonIgnore]
        public double TotalPrice { get => OrderDetails?.Sum(od => od.Price) ?? 0; }

        [JsonIgnore]
        public DateTime OrderdAt { get; set; } = DateTime.Now;
    }

    public class StaffCreateOrderDetail
    {
        public int DrinkId { get; set; }

        public int DrinkSizeId { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }
    }
}
