using System.ComponentModel;

namespace CoffeManagement.Models.Enum
{
    public enum OrderStatus
    {
        [Description("Initialized")]
        ODR_INIT = 0,

        [Description("Comfirmed")]
        ODR_COMF,

        [Description("Completed")]
        ODR_COML,

        [Description("Canceled")]
        ODR_CANL,

        [Description("Served")]
        ODR_SERV,

        [Description("Shipping")]
        ODR_SHIP,

        [Description("Shipped")]
        ODR_SHIPED,

        [Description("Failed")]
        ODR_FAIL,
    }

    public enum CustomerOrderStatus
    {
        [Description("Initialized or Comfirmed")]
        ODR_ORDERED = 0,

        [Description("Shipping or Shipped")]
        ODR_SHIP,

        [Description("Completed")]
        ODR_COML,

        [Description("Canceled")]
        ODR_CANL,

        [Description("Failed")]
        ODR_FAIL,
    }
}
