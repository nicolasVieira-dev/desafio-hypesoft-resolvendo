using Hypesoft.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hypesoft.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
        Database.AutoTransactionBehavior = AutoTransactionBehavior.Never;
    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
}