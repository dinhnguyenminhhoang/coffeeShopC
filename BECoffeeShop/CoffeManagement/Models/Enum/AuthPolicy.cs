using System.ComponentModel;

namespace CoffeManagement.Models.Enum
{
    public enum AuthPolicy
    {
        [Description("Admin")]
        POL_ADMIN = 0,
        
        [Description("Staff")]
        POL_STAFF,
        
        [Description("Customer")]
        POL_CUSTOMER,
    }
}
