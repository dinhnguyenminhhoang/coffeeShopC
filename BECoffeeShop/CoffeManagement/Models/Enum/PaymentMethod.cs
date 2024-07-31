using System.ComponentModel;

namespace CoffeManagement.Models.Enum
{
    public enum PaymentMethod
    {
        [Description("Cash")]
        PAY_CASH, 
        
        [Description("Credit Card")]
        PAY_CCARD, 
        
        [Description("Internet Banking")]
        PAY_INTBK,
    }

}
