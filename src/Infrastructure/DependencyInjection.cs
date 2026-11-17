using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using eCommerce.Infrastructure.Identity;
using eCommerce.Application.Category.Interfaces;
using eCommerce.Application.Product.Interfaces;
using eCommerce.Infrastructure.Persistence;
using eCommerce.Infrastructure.Persistence.Repositories;
using eCommerce.Application.Identity.Interfaces;

namespace eCommerce.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {       
        // Data Base
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("Default")));

         // Identity
        services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options => 
        {
            options.User.RequireUniqueEmail = true;
            
            options.SignIn.RequireConfirmedEmail = true;
            //options.SignIn.RequireConfirmedAccount = true;

            options.Password.RequiredLength = 10;
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireNonAlphanumeric = true;

            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
            options.Lockout.MaxFailedAccessAttempts = 5;

        })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

        services.ConfigureApplicationCookie(options =>
        {
            options.ExpireTimeSpan = TimeSpan.FromMinutes(10);
            options.SlidingExpiration = true;
            
        });

        services.AddScoped<IAuthenticationService, AuthenticationService>();
        //services.AddScoped<AuthenticationService>();
        // Repositories
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();

        return services;
    }
}