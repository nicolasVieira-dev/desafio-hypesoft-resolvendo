using Hypesoft.Application.Dashboard.Queries;

namespace Hypesoft.Application.Interfaces;

public interface IDashboardReadService
{
    Task<DashboardSummaryDto> GetSummaryAsync(CancellationToken ct);
}