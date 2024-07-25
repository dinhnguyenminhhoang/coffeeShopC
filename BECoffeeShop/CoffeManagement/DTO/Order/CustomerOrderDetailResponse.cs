using CoffeManagement.Models;
using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Order
{
    public class CustomerOrderDetailResponse
    {
        public int Id { get; set; }

        public string ShippingAddress { get; set; }

        public string Type { get; set; }

        public string Status { get; set; }

        public string CustomerNote { get; set; }

        public string StaffNote { get; set; }

        public bool? IsPaid { get; set; }

        public DateTime? OrderdAt { get; set; }

        public double TotalPrice { get; set; }

        [JsonIgnore]
        public int? StaffCanceledId { get; set; }

        public string CanceledNote { get; set; }
        
        public string FailedComment { get; set; }

        public IEnumerable<CustomerOrderDetail_ItemDetail> OrderDetails { get; set; } = new List<CustomerOrderDetail_ItemDetail>();

        // --------------------------------------

        public string CanceledBy
        {
            get
            {
                if (StaffCanceledId != null && StaffCanceledId > 0)
                    return "Shop";
                if (!string.IsNullOrEmpty(CanceledNote))
                    return "Your";
                return null;
            }
        }

        public CustomerOrderDetail_Branch Branch { get; set; }

    }

    public class CustomerOrderDetail_ItemDetail
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }

        public CustomerOrderDetail_ItemDetail_Drink Drink { get; set; }
    }
    
    public class CustomerOrderDetail_ItemDetail_Drink
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public string Size { get; set; }

        public double Price { get; set; }
    }

    public class CustomerOrderDetail_Branch
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
