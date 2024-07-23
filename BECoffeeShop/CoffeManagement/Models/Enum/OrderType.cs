using System.ComponentModel;

namespace CoffeManagement.Models.Enum
{
    public enum OrderType
    {
        [Description("Offline")]
        ODR_OFF = 0,
        
        [Description("Online")]
        ODR_ON,
    }
}
