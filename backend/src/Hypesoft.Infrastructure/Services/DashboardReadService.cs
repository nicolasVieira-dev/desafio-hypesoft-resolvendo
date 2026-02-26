using Hypesoft.Application.Dashboard.Queries;
using Hypesoft.Application.Interfaces;
using Hypesoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Hypesoft.Infrastructure.Services;

public class DashboardReadService : IDashboardReadService
{
    private readonly AppDbContext _db;
    public DashboardReadService(AppDbContext db) => _db = db;

    public async Task<DashboardSummaryDto> GetSummaryAsync(CancellationToken ct)
    {
        var products = await _db.Products
            .Select(p => new { p.Id, p.Name, p.CategoryId, p.Price, p.StockQuantity })
            .ToListAsync(ct);

        var totalProducts = products.LongCount();
        var totalStockValue = products.Sum(p => p.Price * p.StockQuantity);

        var lowStock = products
            .Where(p => p.StockQuantity < 10)
            .OrderBy(p => p.StockQuantity)
            .Take(20)
            .Select(p => new LowStockItemDto(p.Id, p.Name, p.CategoryId, p.StockQuantity))
            .ToList();

        var productsByCategory = products
            .GroupBy(p => p.CategoryId)
            .Select(g => new ProductsByCategoryDto(g.Key, g.LongCount()))
            .OrderByDescending(x => x.Count)
            .ToList();

        return new DashboardSummaryDto(totalProducts, totalStockValue, lowStock, productsByCategory);
    }
}