namespace Hypesoft.API.Contracts.Products;

public record UpdateProductRequest(
    string Name,
    string Description,
    decimal Price,
    string CategoryId
);