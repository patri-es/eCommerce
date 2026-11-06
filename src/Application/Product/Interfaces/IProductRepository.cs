
using eCommerce.Application.Product.DTOs;
using ProductEntity = eCommerce.Domain.Entities.Product;

namespace eCommerce.Application.Product.Interfaces;

public interface IProductRepository
{
    Task<List<ProductEntity>> GetProductsAsync(FiltersProductDTO? filters);

    Task<ProductEntity?> GetByIdAsync(int productId);

    Task AddAsync(ProductEntity product);

    Task DeleteAsync(ProductEntity product);

    Task SaveChangesAsync();
}