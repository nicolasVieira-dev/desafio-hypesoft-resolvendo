using Hypesoft.Application.Categories.Commands;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using MediatR;

namespace Hypesoft.Application.Categories.Handlers;

public class CreateCategoryHandler : IRequestHandler<CreateCategoryCommand, string>
{
    private readonly ICategoryRepository _repo;
    public CreateCategoryHandler(ICategoryRepository repo) => _repo = repo;

    public async Task<string> Handle(CreateCategoryCommand request, CancellationToken ct)
    {
        var existing = await _repo.GetByIdAsync(request.Id, ct);
        if (existing is not null) return existing.Id;

        var cat = new Category(request.Id, request.Name);
        await _repo.AddAsync(cat, ct);
        return cat.Id;
    }
}
