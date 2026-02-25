using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(Guid id, CancellationToken ct);

    Task<(IReadOnlyList<Product> Items, long Total)> GetPagedAsync(
        int page,
        int pageSize,
        string? search,
        string? categoryId,
        CancellationToken ct);

    Task AddAsync(Product product, CancellationToken ct);
    Task UpdateAsync(Product product, CancellationToken ct);
    Task DeleteAsync(Product product, CancellationToken ct);
}