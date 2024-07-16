using CoffeManagement.Common.Exceptions;
using CoffeManagement.Data;
using System.Text.Json;

namespace CoffeManagement.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;

        public ErrorHandlingMiddleware(RequestDelegate next, IHostEnvironment env)
        {
            _next = next;
            _env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);

                if (context.Response.StatusCode == StatusCodes.Status404NotFound)
                    throw new NotFoundException("Not Found Resource.");
            }
            catch (CustomHttpException e)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)e.StatusCode;
                await context.Response.WriteAsJsonAsync(
                    new ErrorResponse()
                    {
                        Message = e.Message,
                    },
                    new JsonSerializerOptions()
                    {
                        PropertyNamingPolicy = null,
                        WriteIndented = true
                    }
                 );
            }
            catch (Exception e)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await context.Response.WriteAsJsonAsync(
                    new ErrorResponse()
                    {
                        Message = "Internal Server Error",
                    },
                    new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = null,
                        WriteIndented = true
                    }
                );
            }
        }
    }
}
