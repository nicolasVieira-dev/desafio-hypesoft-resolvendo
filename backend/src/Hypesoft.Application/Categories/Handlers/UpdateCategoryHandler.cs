using Hypesoft.Application.Categories.Commands;
using Hypesoft.Application.Interfaces;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using MediatR;

namespace Hypesoft.Application.Categories.Handlers;

public class UpdateCategoryHandler : IRequestHandler<UpdateCategoryCommand>
{
    private readonly ICategoryRepository _catRepo;
    private readonly ICategoryMigrationService _migration;

    public UpdateCategoryHandler(ICategoryRepository catRepo, ICategoryMigrationService migration)
    {
        _catRepo = catRepo;
        _migration = migration;
    }

    public async Task Handle(UpdateCategoryCommand request, CancellationToken ct)
    {
        var oldId = request.Id.Trim();
        var newId = request.NewId.Trim();
        var newName = request.Name.Trim();

        var current = await _catRepo.GetByIdAsync(oldId, ct);
        if (current is null) throw new KeyNotFoundException("Categoria não encontrada.");

        if (!string.Equals(oldId, newId, StringComparison.OrdinalIgnoreCase))
        {
            var exists = await _catRepo.GetByIdAsync(newId, ct);
            if (exists is not null) throw new InvalidOperationException("Já existe uma categoria com o novo ID.");

            // cria nova categoria
            await _catRepo.AddAsync(new Category(newId, newName), ct);

            // migra produtos do oldId -> newId (infra faz a query/update)
            await _migration.MigrateProductsCategoryAsync(oldId, newId, ct);

            // remove antiga
            await _catRepo.DeleteAsync(current, ct);
        }
        else
        {
            // só renomeia
            current.Rename(newName);
            await _catRepo.UpdateAsync(current, ct);
        }
    }
}