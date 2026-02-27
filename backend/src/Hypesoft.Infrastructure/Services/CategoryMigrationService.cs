using Hypesoft.Application.Interfaces;
using Hypesoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Hypesoft.Infrastructure.Services;

public class CategoryMigrationService : ICategoryMigrationService
{
    private readonly AppDbContext _db;

    public CategoryMigrationService(AppDbContext db) => _db = db;

    public async Task MigrateProductsCategoryAsync(string fromCategoryId, string toCategoryId, CancellationToken ct)
    {
        var products = await _db.Products
            .Where(p => p.CategoryId == fromCategoryId)
            .ToListAsync(ct);

        foreach (var p in products)
        {
            // preserva dados e muda só a categoria
            p.Update(p.Name, p.Description, p.Price, toCategoryId);
        }

        await _db.SaveChangesAsync(ct);
    }
}