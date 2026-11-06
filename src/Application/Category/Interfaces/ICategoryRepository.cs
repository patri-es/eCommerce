using CategoryEntity = eCommerce.Domain.Entities.Category;

namespace eCommerce.Application.Category.Interfaces;

public interface ICategoryRepository
{
    Task<List<CategoryEntity>> GetCategoriesAsync();

    Task<CategoryEntity?> GetByIdAsync(int categoryId);

    Task AddAsync(CategoryEntity category);

    Task DeleteAsync(CategoryEntity category);

    Task SaveChangesAsync();
}