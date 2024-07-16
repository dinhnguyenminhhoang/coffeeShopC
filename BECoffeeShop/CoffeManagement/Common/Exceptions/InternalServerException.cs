using System.Net;

namespace CoffeManagement.Common.Exceptions
{
    public class InternalServerException : CustomHttpException
    {
        public InternalServerException(string? message) : base(message, HttpStatusCode.InternalServerError)
        {
        }
    }
}
