using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;
using Hypesoft.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Hypesoft.Application.Interfaces;
using Hypesoft.Infrastructure.Services;


namespace Hypesoft.Infrastructure.Configurations;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        var connectionString = config.GetConnectionString("Mongo")!;

        services.AddDbContext<AppDbContext>(opt =>
        {
            opt.UseMongoDB(connectionString, databaseName: config["Mongo:Database"] ?? "hypesoftdb");
        });

        services.AddScoped<ICategoryMigrationService, CategoryMigrationService>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IDashboardReadService, DashboardReadService>();

        return services;
    }
}