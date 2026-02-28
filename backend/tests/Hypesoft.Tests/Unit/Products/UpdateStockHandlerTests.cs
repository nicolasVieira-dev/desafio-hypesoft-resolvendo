using FluentAssertions;
using Hypesoft.Application.Products.Commands;
using Hypesoft.Application.Products.Handlers;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Moq;

namespace Hypesoft.Tests.Unit.Products;

public class UpdateStockHandlerTests
{
    [Fact]
    public async Task Handle_ShouldUpdateStock()
    {
        var repo = new Mock<IProductRepository>();

        var productId = Guid.NewGuid();

    
    
        var product = new Product(
            
            "Mouse",
            "Sem fio",
            100m,
            "tech",
            5
        );

    
    

        repo.Setup(x => x.GetByIdAsync(productId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(product);

        var handler = new UpdateProductStockHandler(repo.Object);

        await handler.Handle(new UpdateProductStockCommand(productId, 20), CancellationToken.None);

        product.StockQuantity.Should().Be(20);

        repo.Verify(x => x.UpdateAsync(product, It.IsAny<CancellationToken>()), Times.Once);
    }
}