using CoffeManagement.Models;
using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Order
{
    public class StaffOrderDetailResponse
    {
        public int Id { get; set; }

        public string ShippingAddress { get; set; }

        public string Type { get; set; }

        public string Status { get; set; }

        public StaffOrderDetail_Customer Customer { get; set; }

        public string CustomerNote { get; set; }

        public StaffOrderDetail_Staff Staff { get; set; }

        public string StaffNote { get; set; }

        public bool? IsPaid { get; set; }

        public DateTime? OrderdAt { get; set; }

        public double TotalPrice { get; set; }

        [JsonIgnore]
        public int? StaffCanceledId { get; set; }

        public string CanceledNote { get; set; }

        public string FailedComment { get; set; }

        public IEnumerable<StaffOrderDetail_ItemDetail> OrderDetails { get; set; } = new List<StaffOrderDetail_ItemDetail>();

        // --------------------------------------

        public StaffOrderDetail_Staff CanceledBy { get; set; }

        public StaffOrderDetail_Branch Branch { get; set; }

    }

    public class StaffOrderDetail_Staff
    {
        public int Id { get; set; }
        public string FullName { get; set; }
    }

    public class StaffOrderDetail_Customer
    {
        public int Id { get; set; }
        public string FullName { get; set; }
    }

    public class StaffOrderDetail_ItemDetail
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }

        public StaffOrderDetail_ItemDetail_Drink Drink { get; set; }
    }

    public class StaffOrderDetail_ItemDetail_Drink
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public string Size { get; set; }

        public double Price { get; set; }
    }

    public class StaffOrderDetail_Branch
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
