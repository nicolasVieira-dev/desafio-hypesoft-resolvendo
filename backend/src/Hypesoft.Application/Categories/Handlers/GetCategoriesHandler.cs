using Hypesoft.Application.Categories.Queries;
using Hypesoft.Application.DTOs;
using Hypesoft.Domain.Repositories;
using MediatR;

namespace Hypesoft.Application.Categories.Handlers;

public class GetCategoriesHandler : IRequestHandler<GetCategoriesQuery, IReadOnlyList<CategoryDto>>
{
    private readonly ICategoryRepository _repo;
    public GetCategoriesHandler(ICategoryRepository repo) => _repo = repo;

    public async Task<IReadOnlyList<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken ct)
    {
        var cats = await _repo.GetAllAsync(ct);
        return cats.Select(c => new CategoryDto(c.Id, c.Name)).ToList();
    }
}