namespace Hypesoft.Application.Interfaces;

public interface ICategoryMigrationService
{
    Task MigrateProductsCategoryAsync(string fromCategoryId, string toCategoryId, CancellationToken ct);
}