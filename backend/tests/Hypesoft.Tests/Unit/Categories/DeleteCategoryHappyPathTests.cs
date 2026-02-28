using FluentAssertions;
using Hypesoft.Application.Categories.Commands;
using Hypesoft.Application.Categories.Handlers;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Moq;

namespace Hypesoft.Tests.Unit.Categories;

public class DeleteCategoryHappyPathTests
{
    [Fact]
    public async Task Handle_ShouldDelete_WhenNoProducts()
    {
        var categoryRepo = new Mock<ICategoryRepository>();
        var productRepo = new Mock<IProductRepository>();

        var category = new Category("home", "Casa");

        categoryRepo
            .Setup(x => x.GetByIdAsync("home", It.IsAny<CancellationToken>()))
            .ReturnsAsync(category);

        productRepo
            .Setup(x => x.ExistsByCategoryAsync("home", It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        var handler = new DeleteCategoryHandler(categoryRepo.Object, productRepo.Object);

        await handler.Handle(new DeleteCategoryCommand("home"), CancellationToken.None);

        categoryRepo.Verify(x => x.DeleteAsync(category, It.IsAny<CancellationToken>()), Times.Once);
    }
}