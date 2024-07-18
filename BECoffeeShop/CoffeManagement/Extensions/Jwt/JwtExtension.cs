using CoffeManagement.Common.Exceptions;
using CoffeManagement.Models.Enum;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.SqlServer.Update.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CoffeManagement.Extensions.Jwt
{
    public static class JwtExtension
    {
        public static IServiceCollection AddJwtConfiguration(this IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
        {

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["Jwt:Key"]!)),
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            throw new UnauthorizedException("Unauthorized");
                        },

                        OnForbidden = context =>
                        {
                            throw new ForbiddenException("Forbidden");
                        },

                        OnMessageReceived = context =>
                        {
                            var requiresAuthorization = context.HttpContext.GetEndpoint()?.Metadata.GetMetadata<AuthorizeAttribute>() != null;
                            if (requiresAuthorization)
                            {
                                string? token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                                if (string.IsNullOrEmpty(token) || token?.Split('.').Length != 3)
                                {
                                    throw new UnauthorizedException("Unauthorized");
                                }
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(
                    AuthPolicy.POL_CUSTOMER.ToString(),
                    policy => policy.RequireRole(AuthRole.ROLE_CUSTOMER.ToString())
                );
                options.AddPolicy(
                    AuthPolicy.POL_ADMIN.ToString(),
                    policy => policy.RequireRole(AuthRole.ROLE_ADMIN.ToString())
                );
                options.AddPolicy(
                    AuthPolicy.POL_STAFF.ToString(),
                    policy => policy.RequireRole(
                        AuthRole.ROLE_STAFF.ToString(),
                        AuthRole.ROLE_ADMIN.ToString()
                    )
                );
            });

            return services;

        }
    }
}
