using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories;

public interface ICategoryRepository
{
    Task<IReadOnlyList<Category>> GetAllAsync(CancellationToken ct);
    Task<Category?> GetByIdAsync(string id, CancellationToken ct);

    Task AddAsync(Category category, CancellationToken ct);
}