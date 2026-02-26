using MediatR;

namespace Hypesoft.Application.Products.Commands;

public record UpdateProductCommand(
    Guid Id,
    string Name,
    string Description,
    decimal Price,
    string CategoryId
) : IRequest;