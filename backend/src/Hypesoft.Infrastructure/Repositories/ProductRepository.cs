using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Hypesoft.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _db;

    public ProductRepository(AppDbContext db) => _db = db;

    public Task<Product?> GetByIdAsync(Guid id, CancellationToken ct) =>
        _db.Products.FirstOrDefaultAsync(x => x.Id == id, ct);

    public async Task<(IReadOnlyList<Product> Items, long Total)> GetPagedAsync(
        int page, int pageSize, string? search, string? categoryId, CancellationToken ct)
    {
        var q = _db.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            q = q.Where(p => p.Name.ToLower().Contains(search.ToLower()));

        if (!string.IsNullOrWhiteSpace(categoryId))
            q = q.Where(p => p.CategoryId == categoryId);

        var total = await q.LongCountAsync(ct);

        var items = await q
            .OrderByDescending(p => p.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        return (items, total);
    }

    public async Task AddAsync(Product product, CancellationToken ct)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(Product product, CancellationToken ct)
    {
        _db.Products.Update(product);
        await _db.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Product product, CancellationToken ct)
    {
        _db.Products.Remove(product);
        await _db.SaveChangesAsync(ct);
    }
}