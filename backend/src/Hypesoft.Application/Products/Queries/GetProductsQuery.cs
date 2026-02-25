using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Products.Queries;

public record GetProductsQuery(
    int Page = 1,
    int PageSize = 20,
    string? Search = null,
    string? CategoryId = null
) : IRequest<PagedResult<ProductDto>>;

public record PagedResult<T>(IReadOnlyList<T> Items, long Total, int Page, int PageSize);