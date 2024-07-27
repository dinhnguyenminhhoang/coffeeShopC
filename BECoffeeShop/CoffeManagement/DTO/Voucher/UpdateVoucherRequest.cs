using System.Text.Json.Serialization;

namespace CoffeManagement.DTO.Voucher
{
    public class UpdateVoucherRequest
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public double Discount { get; set; }

        public int Amount { get; set; }

        public DateTime ExpiredAt { get; set; }

        public IEnumerable<int> ListDrink { get; set; } = new List<int>();

        [JsonIgnore]
        public int Remain { get => Amount; }

        [JsonIgnore]
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    }

}
