using MediatR;

namespace Hypesoft.Application.Products.Commands;

public record CreateProductCommand(
    string Name,
    string Description,
    decimal Price,
    string CategoryId,
    int StockQuantity
) : IRequest<Guid>;