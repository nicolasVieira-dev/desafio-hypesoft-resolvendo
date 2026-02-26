using MediatR;

namespace Hypesoft.Application.Products.Commands;

public record UpdateProductStockCommand(Guid Id, int StockQuantity) : IRequest;