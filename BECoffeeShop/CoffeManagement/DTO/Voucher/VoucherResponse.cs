namespace CoffeManagement.DTO.Voucher
{
    public class VoucherResponse
    {
        public int Id { get; set; }

        public string Staus { get; set; }

        public double Discount { get; set; }

        public int Amount { get; set; }

        public int Remain { get; set; }

        public int AmountDrinkApply { get; set; }

        public DateTime ExpiredAt { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
