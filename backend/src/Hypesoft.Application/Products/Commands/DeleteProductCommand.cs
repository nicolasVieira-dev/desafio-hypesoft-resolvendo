using MediatR;

namespace Hypesoft.Application.Products.Commands;

public record DeleteProductCommand(Guid Id) : IRequest;