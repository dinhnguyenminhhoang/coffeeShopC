using System.ComponentModel;

namespace CoffeManagement.Models.Enum
{
    public enum AuthRole
    {
        [Description("Admin")]
        ROLE_ADMIN = 0,
        
        [Description("Staff")]
        ROLE_STAFF,
        
        [Description("Customer")]
        ROLE_CUSTOMER,
    }
}
