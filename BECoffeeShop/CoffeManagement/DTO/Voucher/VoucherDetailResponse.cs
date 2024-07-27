namespace CoffeManagement.DTO.Voucher
{
    public class VoucherDetailResponse
    {
        public int Id { get; set; }
        
        public string Code { get; set; }

        public string Staus { get; set; }

        public double Discount { get; set; }

        public int Amount { get; set; }

        public int Remain { get; set; }

        public IEnumerable<VoucherDetail_Drink> DrinksApply { get; set; } = new List<VoucherDetail_Drink>();

        public DateTime ExpiredAt { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }

    public class VoucherDetail_Drink
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }
    }
}
