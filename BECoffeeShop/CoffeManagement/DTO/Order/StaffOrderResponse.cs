using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Order
{
    public class StaffOrderResponse
    {
        public int Id { get; set; }

        public int BranchId { get; set; }

        public string ShippingAddress { get; set; }

        public string Type { get; set; }

        public string Status { get; set; }

        public string PaymentMethod { get; set; }

        public string CustomerNote { get; set; }

        public bool? IsPaid { get; set; }

        public DateTime? OrderdAt { get; set; }

        public double TotalPrice { get; set; }

        [JsonIgnore]
        public int? StaffCanceledId { get; set; }

        public string CanceledNote { get; set; }

        public string FailedComment { get; set; }

        // --------------------------------------

        public string StaffName { get; set; }

        public string CanceledBy { get; set; }

    }
}
