using MediatR;

namespace Hypesoft.Application.Dashboard.Queries;

public record GetDashboardSummaryQuery() : IRequest<DashboardSummaryDto>;

public record DashboardSummaryDto(
    long TotalProducts,
    decimal TotalStockValue,
    IReadOnlyList<LowStockItemDto> LowStock,
    IReadOnlyList<ProductsByCategoryDto> ProductsByCategory
);

public record LowStockItemDto(Guid Id, string Name, string CategoryId, int StockQuantity);

public record ProductsByCategoryDto(string CategoryId, long Count);