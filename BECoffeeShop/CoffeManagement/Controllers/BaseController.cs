using CoffeManagement.Common.Pagging;
using CoffeManagement.Data;
using Microsoft.AspNetCore.Mvc;

namespace CoffeManagement.Controllers
{
    public class BaseController : ControllerBase
    {
        public BaseController()
        {
        }

        protected SuccessResponse<T> RenderSuccessResponse<T>(T data = default(T), string message = "")
        {
            return new SuccessResponse<T>()
            {
                Message = message,
                ResultData = data
            };
        }

        protected ErrorResponse RenderErrorResponse(string message = "")
        {
            return new ErrorResponse()
            {
                Message = message,
            };
        }
    }
}
