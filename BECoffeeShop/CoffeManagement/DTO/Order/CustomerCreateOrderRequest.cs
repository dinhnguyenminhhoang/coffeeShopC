using CoffeManagement.Models;
using CoffeManagement.Models.Enum;
using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Order
{
    public class CustomerCreateOrderRequest
    {
        public int BranchId { get; set; }

        public string ShippingAddress { get; set; }

        public string PaymentMethod { get; set; }

        public string CustomerNote { get; set; }

        public IEnumerable<CustomerCreateOrderDetail> OrderDetails { get; set; } = new List<CustomerCreateOrderDetail>();

        [JsonIgnore]
        public string Type { get; set; } = OrderType.ODR_ON.ToString();

        [JsonIgnore]
        public string Status { get; set; } = OrderStatus.ODR_INIT.ToString();

        [JsonIgnore]
        public double TotalPrice { get => OrderDetails?.Sum(od => od.Price) ?? 0; }

        [JsonIgnore]
        public DateTime OrderdAt { get; set; } = DateTime.Now;
    }

    public class CustomerCreateOrderDetail
    {
        public int DrinkId { get; set; }

        public int DrinkSizeId { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }
    }
}
