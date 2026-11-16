using Microsoft.Extensions.DependencyInjection;
using eCommerce.Application.Category;
using eCommerce.Application.Category.Interfaces;
using eCommerce.Application.Product;
using eCommerce.Application.Product.Interfaces;
using eCommerce.Application.Identity;


namespace eCommerce.Application;

public static class DependencyInjection 
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ICategoryUseCases, CategoryUseCases>();
        services.AddScoped<IProductUseCases, ProductUseCases>();
        services.AddScoped<AuthenticationUseCases>();

        return services;
    }
}