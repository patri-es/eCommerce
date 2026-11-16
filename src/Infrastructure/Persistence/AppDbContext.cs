using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using eCommerce.Domain.Entities;
using eCommerce.Infrastructure.Persistence.Configurations;
using eCommerce.Infrastructure.Identity;

namespace eCommerce.Infrastructure.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options)
{
    // Avoids initializing null entities.
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();

    // Relationship reference in ProductCategoryConfiguration.Thanks to this, ApplyConfigurationsFromAssembly() can find the relationship.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Explicit relationship configuration reference.
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        ProductCategoryConfiguration.Configure(modelBuilder);
    }
}