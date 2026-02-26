using Hypesoft.Application.Dashboard.Queries;
using Hypesoft.Application.Interfaces;
using MediatR;

namespace Hypesoft.Application.Dashboard.Handlers;

public class GetDashboardSummaryHandler : IRequestHandler<GetDashboardSummaryQuery, DashboardSummaryDto>
{
    private readonly IDashboardReadService _svc;

    public GetDashboardSummaryHandler(IDashboardReadService svc) => _svc = svc;

    public Task<DashboardSummaryDto> Handle(GetDashboardSummaryQuery request, CancellationToken ct)
        => _svc.GetSummaryAsync(ct);
}