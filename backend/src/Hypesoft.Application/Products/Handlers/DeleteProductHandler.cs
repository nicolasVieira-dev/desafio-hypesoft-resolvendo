using Hypesoft.Application.Products.Commands;
using Hypesoft.Domain.Repositories;
using MediatR;

namespace Hypesoft.Application.Products.Handlers;

public class DeleteProductHandler : IRequestHandler<DeleteProductCommand>
{
    private readonly IProductRepository _repo;
    public DeleteProductHandler(IProductRepository repo) => _repo = repo;

    public async Task Handle(DeleteProductCommand request, CancellationToken ct)
    {
        var product = await _repo.GetByIdAsync(request.Id, ct);
        if (product is null) return;

        await _repo.DeleteAsync(product, ct);
    }
}