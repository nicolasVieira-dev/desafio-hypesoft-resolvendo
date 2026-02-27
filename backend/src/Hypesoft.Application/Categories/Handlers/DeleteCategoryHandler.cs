using Hypesoft.Application.Categories.Commands;
using Hypesoft.Domain.Repositories;
using MediatR;

namespace Hypesoft.Application.Categories.Handlers;

public class DeleteCategoryHandler : IRequestHandler<DeleteCategoryCommand>
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IProductRepository _productRepository;

    public DeleteCategoryHandler(
        ICategoryRepository categoryRepository,
        IProductRepository productRepository)
    {
        _categoryRepository = categoryRepository;
        _productRepository = productRepository;
    }

    public async Task Handle(DeleteCategoryCommand request, CancellationToken ct)
    {
        var category = await _categoryRepository.GetByIdAsync(request.Id, ct);

        if (category is null)
            return; // idempotente

        // regra de negócio: não permitir deletar se houver produtos
        var hasProducts = await _productRepository.ExistsByCategoryAsync(request.Id, ct);

        if (hasProducts)
            throw new InvalidOperationException("Não é possível excluir categoria com produtos associados.");

        await _categoryRepository.DeleteAsync(category, ct);
    }
}