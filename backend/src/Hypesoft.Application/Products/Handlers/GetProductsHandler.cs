using Hypesoft.Application.DTOs;
using Hypesoft.Application.Products.Queries;
using Hypesoft.Domain.Repositories;
using MediatR;

namespace Hypesoft.Application.Products.Handlers;

public class GetProductsHandler : IRequestHandler<GetProductsQuery, PagedResult<ProductDto>>
{
    private readonly IProductRepository _repo;

    public GetProductsHandler(IProductRepository repo) => _repo = repo;

    public async Task<PagedResult<ProductDto>> Handle(GetProductsQuery request, CancellationToken ct)
    {
        var (items, total) = await _repo.GetPagedAsync(
            request.Page,
            request.PageSize,
            request.Search,
            request.CategoryId,
            ct);

        var dto = items
            .Select(p => new ProductDto(p.Id, p.Name, p.Description, p.Price, p.CategoryId, p.StockQuantity))
            .ToList();

        return new PagedResult<ProductDto>(dto, total, request.Page, request.PageSize);
    }
}