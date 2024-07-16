using System.Net;

namespace CoffeManagement.Common.Exceptions
{
    public class ForbiddenException : CustomHttpException
    {
        public ForbiddenException(string? message) : base(message, HttpStatusCode.Forbidden)
        {
        }
    }
}
