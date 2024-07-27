using CoffeManagement.Models.Enum;
using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Voucher
{
    public class CreateVoucherRequest
    {
        public double Discount { get; set; }

        public int Amount { get; set; }

        public IEnumerable<int> ListDrink { get; set; } = new List<int>();

        [JsonIgnore]
        public string Staus { get; set; } = VoucherStatus.VOUC_INIT.ToString();

        [JsonIgnore]
        public int Remain { get => Amount; }

        public DateTime ExpiredAt { get; set; }

        [JsonIgnore]
        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        [JsonIgnore]
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    }
}
