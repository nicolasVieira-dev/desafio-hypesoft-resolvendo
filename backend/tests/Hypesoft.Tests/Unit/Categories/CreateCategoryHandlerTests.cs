using FluentAssertions;
using Hypesoft.Application.Categories.Commands;
using Hypesoft.Application.Categories.Handlers;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Moq;

namespace Hypesoft.Tests.Unit.Categories;

public class CreateCategoryHandlerTests
{
    [Fact]
    public async Task Handle_ShouldReturnExistingId_WhenCategoryAlreadyExists()
    {
    
        var repo = new Mock<ICategoryRepository>();

        repo.Setup(x => x.GetByIdAsync("tech", It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Category("tech", "Tecnologia"));

        var handler = new CreateCategoryHandler(repo.Object);

    
        var result = await handler.Handle(new CreateCategoryCommand("tech", "Tecnologia"), CancellationToken.None);

    
        result.Should().Be("tech");
        repo.Verify(x => x.AddAsync(It.IsAny<Category>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Handle_ShouldCreateCategory_WhenDoesNotExist()
    {
    
        var repo = new Mock<ICategoryRepository>();

        repo.Setup(x => x.GetByIdAsync("home", It.IsAny<CancellationToken>()))
            .ReturnsAsync((Category?)null);

        var handler = new CreateCategoryHandler(repo.Object);

    
        var result = await handler.Handle(new CreateCategoryCommand("home", "Casa"), CancellationToken.None);

    
        result.Should().Be("home");

        repo.Verify(x => x.AddAsync(
            It.Is<Category>(c => c.Id == "home" && c.Name == "Casa"),
            It.IsAny<CancellationToken>()),
            Times.Once);
    }
}