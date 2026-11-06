
using eCommerce.Application.Category.DTOs;
using CategoryEntity = eCommerce.Domain.Entities.Category;
using eCommerce.Application.Category;

namespace eCommerce.Application.Category.Interfaces;

public interface ICategoryUseCases 
{
    Task<List<CategorySummaryDTO>> GetCategories();

    Task<CategoryDTO?> GetCategoryById(int categoryId);

    Task CreateCategory(CreateCategoryDTO category);

    Task DeleteCategory(int categoryId);

    Task UpdateCategory(int categoryId, UpdateCategoryDTO category);

    Task ChangeCategoryName(int categoryId, string name);

    Task ChangeCategoryDescription(int categoryId, string? description);

    Task ChangeCategoryCode(int categoryId, string code);

    Task ChangeCategoryImage(int categoryId, string? imageUrl);

    //Task SaveChangesAsync();
}