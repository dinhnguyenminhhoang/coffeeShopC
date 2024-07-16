using System.Net;

namespace CoffeManagement.Common.Exceptions
{
    public class BadRequestException : CustomHttpException
    {
        public BadRequestException(string? message) : base(message, HttpStatusCode.BadRequest)
        {
        }
    }
}
