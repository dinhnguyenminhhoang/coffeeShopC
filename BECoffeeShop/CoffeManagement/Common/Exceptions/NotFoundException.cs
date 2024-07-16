using System.Net;

namespace CoffeManagement.Common.Exceptions
{
    public class NotFoundException : CustomHttpException
    {
        public NotFoundException(string? message) : base(message, HttpStatusCode.NotFound)
        {
        }
    }
}
