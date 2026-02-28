using FluentAssertions;
using Hypesoft.Application.Categories.Commands;
using Hypesoft.Application.Categories.Handlers;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Moq;

namespace Hypesoft.Tests.Unit.Categories;

public class DeleteCategoryHandlerTests
{
    [Fact]
    public async Task Handle_ShouldThrow_WhenCategoryHasProducts()
    {
        var categoryRepo = new Mock<ICategoryRepository>();
        var productRepo = new Mock<IProductRepository>();

        categoryRepo
            .Setup(x => x.GetByIdAsync("tech", It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Category("tech", "Tecnologia"));

        productRepo
            .Setup(x => x.ExistsByCategoryAsync("tech", It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        var handler = new DeleteCategoryHandler(categoryRepo.Object, productRepo.Object);

        var act = async () => await handler.Handle(new DeleteCategoryCommand("tech"), CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>()
            .WithMessage("*produtos associados*");
    }

    [Fact]
    public async Task Handle_ShouldDoNothing_WhenCategoryDoesNotExist()
    {
        var categoryRepo = new Mock<ICategoryRepository>();
        var productRepo = new Mock<IProductRepository>();

        categoryRepo
            .Setup(x => x.GetByIdAsync("x", It.IsAny<CancellationToken>()))
            .ReturnsAsync((Category?)null);

        var handler = new DeleteCategoryHandler(categoryRepo.Object, productRepo.Object);

        await handler.Handle(new DeleteCategoryCommand("x"), CancellationToken.None);

        categoryRepo.Verify(x => x.DeleteAsync(It.IsAny<Category>(), It.IsAny<CancellationToken>()), Times.Never);
    }
}