using Hypesoft.Application.Products.Commands;
using Hypesoft.Domain.Repositories;
using MediatR;

namespace Hypesoft.Application.Products.Handlers;

public class UpdateProductStockHandler : IRequestHandler<UpdateProductStockCommand>
{
    private readonly IProductRepository _repo;

    public UpdateProductStockHandler(IProductRepository repo) => _repo = repo;

    public async Task Handle(UpdateProductStockCommand request, CancellationToken ct)
    {
        var product = await _repo.GetByIdAsync(request.Id, ct);
        if (product is null) throw new KeyNotFoundException("Produto não encontrado.");

        product.UpdateStock(request.StockQuantity);
        await _repo.UpdateAsync(product, ct);
    }
}