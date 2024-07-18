using System.ComponentModel;

namespace CoffeManagement.Models.Enum
{
    public enum AccountType
    {
        [Description("Customer Account")]
        ACC_CUS = 0,
        
        [Description("Satff Account")]
        ACC_STA,
    }
}
