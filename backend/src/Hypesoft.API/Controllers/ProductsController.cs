using Hypesoft.Application.Products.Commands;
using Hypesoft.Application.Products.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Hypesoft.API.Contracts.Products;
using Microsoft.AspNetCore.Authorization;


namespace Hypesoft.API.Controllers;


[Authorize]
[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;
    public ProductsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int page = 1, [FromQuery] int pageSize = 20,
                                         [FromQuery] string? search = null, [FromQuery] string? categoryId = null,
                                         CancellationToken ct = default)
    {
        var result = await _mediator.Send(new GetProductsQuery(page, pageSize, search, categoryId), ct);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductCommand cmd, CancellationToken ct)
    {
        var id = await _mediator.Send(cmd, ct);
        return Ok(new { id });
    }
[HttpPut("{id:guid}")]
public async Task<IActionResult> Update(
    Guid id,
    [FromBody] UpdateProductRequest body,
    CancellationToken ct)
{
    await _mediator.Send(new UpdateProductCommand(
        id,
        body.Name,
        body.Description,
        body.Price,
        body.CategoryId
    ), ct);

    return NoContent();
}

[HttpPatch("{id:guid}/stock")]
public async Task<IActionResult> UpdateStock(
    Guid id,
    [FromBody] UpdateStockRequest body,
    CancellationToken ct)
{
    await _mediator.Send(new UpdateProductStockCommand(id, body.StockQuantity), ct);
    return NoContent();
}

[HttpDelete("{id:guid}")]
public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
{
    await _mediator.Send(new DeleteProductCommand(id), ct);
    return NoContent();
}
}