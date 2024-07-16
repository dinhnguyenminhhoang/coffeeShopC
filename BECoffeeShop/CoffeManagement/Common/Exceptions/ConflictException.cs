using System.Net;

namespace CoffeManagement.Common.Exceptions
{
    public class ConflictException : CustomHttpException
    {
        public ConflictException(string? message) : base(message, HttpStatusCode.Conflict)
        {
        }
    }
}
