using Hypesoft.Application.Products.Commands;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using MediatR;

namespace Hypesoft.Application.Products.Handlers;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, Guid>
{
    private readonly IProductRepository _repo;
    private readonly ICategoryRepository _catRepo;

    public CreateProductHandler(IProductRepository repo, ICategoryRepository catRepo)
    {
        _repo = repo;
        _catRepo = catRepo;
    }

    public async Task<Guid> Handle(CreateProductCommand request, CancellationToken ct)
    {
        var cat = await _catRepo.GetByIdAsync(request.CategoryId, ct);
        if (cat is null) throw new InvalidOperationException("Categoria inválida.");

        var product = new Product(request.Name, request.Description, request.Price, request.CategoryId, request.StockQuantity);

        await _repo.AddAsync(product, ct);
        return product.Id;
    }
}