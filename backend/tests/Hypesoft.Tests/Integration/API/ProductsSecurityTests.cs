using System.Net;
using FluentAssertions;

namespace Hypesoft.Tests.Integration.Api;

public class ProductsSecurityTests : IClassFixture<ApiFactory>
{
    private readonly HttpClient _client;

    public ProductsSecurityTests(ApiFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GET_products_WithoutAuth_ShouldReturn401()
    {
        var res = await _client.GetAsync("/api/products");
        res.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }
}