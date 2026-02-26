using Hypesoft.Application.Products.Commands;
using Hypesoft.Domain.Repositories;
using MediatR;

namespace Hypesoft.Application.Products.Handlers;

public class UpdateProductHandler : IRequestHandler<UpdateProductCommand>
{
    private readonly IProductRepository _repo;
    private readonly ICategoryRepository _catRepo;

    public UpdateProductHandler(IProductRepository repo, ICategoryRepository catRepo)
    {
        _repo = repo;
        _catRepo = catRepo;
    }

    public async Task Handle(UpdateProductCommand request, CancellationToken ct)
    {
        var product = await _repo.GetByIdAsync(request.Id, ct);
        if (product is null) throw new KeyNotFoundException("Produto não encontrado.");

        var cat = await _catRepo.GetByIdAsync(request.CategoryId, ct);
        if (cat is null) throw new InvalidOperationException("Categoria inválida.");

        product.Update(request.Name, request.Description, request.Price, request.CategoryId); 
        await _repo.UpdateAsync(product, ct);
    }
}