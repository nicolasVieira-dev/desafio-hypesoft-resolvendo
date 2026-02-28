using FluentValidation;
using FluentValidation.AspNetCore;
using Hypesoft.Infrastructure.Configurations;
using MediatR;
using Microsoft.AspNetCore.RateLimiting;
using Serilog;
using System.Threading.RateLimiting;
using Hypesoft.API.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var authority = builder.Configuration["Auth:Authority"];
var audience = builder.Configuration["Auth:Audience"];

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = authority;
        options.Audience = audience;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = authority,
            ValidateAudience = true,
            ValidAudience = audience,
            ValidateLifetime = true
        };
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "preferred_username",
            RoleClaimType = "roles"
        };
        options.Events = new JwtBearerEvents
{
    OnTokenValidated = context =>
    {
        var identity = context.Principal?.Identity as System.Security.Claims.ClaimsIdentity;
        if (identity is null) return Task.CompletedTask;

        var realmAccess = context.Principal?.FindFirst("realm_access")?.Value;
        if (string.IsNullOrWhiteSpace(realmAccess)) return Task.CompletedTask;

        
        using var doc = System.Text.Json.JsonDocument.Parse(realmAccess);
        if (doc.RootElement.TryGetProperty("roles", out var rolesEl) && rolesEl.ValueKind == System.Text.Json.JsonValueKind.Array)
        {
            foreach (var r in rolesEl.EnumerateArray())
            {
                var role = r.GetString();
                if (!string.IsNullOrWhiteSpace(role))
                    identity.AddClaim(new System.Security.Claims.Claim("roles", role));
            }
        }

        return Task.CompletedTask;
    }
};
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("ManagerOrAdmin", policy => policy.RequireRole("Manager", "Admin"));

});



builder.Host.UseSerilog((ctx, cfg) =>
    cfg.ReadFrom.Configuration(ctx.Configuration)
       .Enrich.FromLogContext()
       .WriteTo.Console()
);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Hypesoft.Application.DTOs.ProductDto).Assembly));
builder.Services.AddValidatorsFromAssembly(typeof(Hypesoft.Application.DTOs.ProductDto).Assembly);
builder.Services.AddFluentValidationAutoValidation();


builder.Services.AddInfrastructure(builder.Configuration);


builder.Services.AddRateLimiter(opt =>
{
    opt.AddFixedWindowLimiter("fixed", o =>
    {
        o.PermitLimit = 100;
        o.Window = TimeSpan.FromMinutes(1);
        o.QueueLimit = 0;
        o.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
});

builder.Services.AddHealthChecks();

builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(p =>
        p.WithOrigins("http://localhost:3000")
         .AllowAnyHeader()
         .AllowAnyMethod());
});

builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();


app.UseAuthentication();
app.UseAuthorization();

app.UseSerilogRequestLogging();

app.UseCors();

app.UseMiddleware<ExceptionMiddleware>();

app.UseRateLimiter();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHealthChecks("/health");

app.MapControllers();
app.Run();
public partial class Program { }