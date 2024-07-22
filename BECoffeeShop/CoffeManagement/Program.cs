
using CoffeManagement.Data;
using CoffeManagement.Extensions.CORS;
using CoffeManagement.Extensions.Jwt;
using CoffeManagement.Infrastructure.Jwt;
using CoffeManagement.Middlewares;
using CoffeManagement.Repositories.BranchRepo;
using CoffeManagement.Repositories.CustomerRepo;
using CoffeManagement.Repositories.DrinkRepo;
using CoffeManagement.Repositories.IngredientRepo;
using CoffeManagement.Repositories.RecipeRepo;
using CoffeManagement.Repositories.StaffRepo;
using CoffeManagement.Services.AccountService;
using CoffeManagement.Services.BrachService;
using CoffeManagement.Services.CustomerService;
using CoffeManagement.Services.DrinkService;
using CoffeManagement.Services.IngredientService;
using CoffeManagement.Services.PaymentStripeService;
using CoffeManagement.Services.StaffService;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace CoffeManagement
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CoffeeManagement API", Version = "v1" });

                c.EnableAnnotations();

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            // Services configs
            builder.Services.AddDbContext<DBContext>(option =>
            {
                option
                    .UseLazyLoadingProxies()
                    .UseSqlServer(builder.Configuration.GetConnectionString("SQLServer"));
            });
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddAutoMapper(typeof(Program).Assembly);
            builder.Services.AddJwtConfiguration(builder.Configuration, builder.Environment);

            builder.Services.AddScoped<JwtUtil>();
            builder.Services.AddScoped<IDrinkRepository, DrinkRepository>();
            builder.Services.AddScoped<IDrinkSizeRepository, DrinkSizeRepository>();
            builder.Services.AddScoped<IAccountRepository, AccountRepository>();
            builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
            builder.Services.AddScoped<IBranchRepository, BranchRepository>();
            builder.Services.AddScoped<IStaffRepository, StaffRepository>();
            builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();
            builder.Services.AddScoped<IRecipeDetailRepository, RecipeDetailRepository>();
            builder.Services.AddScoped<IIngredientRepository, IngredientRepository>();
            builder.Services.AddScoped<IIngredientStockRepository, IngredientStockRepository>();
            builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
            builder.Services.AddScoped<IDrinkService, DrinkService>();
            builder.Services.AddScoped<IBranchService, BranchService>();
            builder.Services.AddScoped<ICustomerService, CustomerService>();
            builder.Services.AddScoped<IStaffService, StaffService>();
            builder.Services.AddScoped<IIngredientService, IngredientService>();
            builder.Services.AddScoped<IPaymentStripeService, PaymentStripeService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Use middleware
            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseHttpsRedirection();

            app.UseCustomCors(builder.Configuration);

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
