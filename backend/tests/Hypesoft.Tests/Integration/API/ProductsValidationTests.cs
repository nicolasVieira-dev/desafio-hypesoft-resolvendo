using System.Net;
using System.Text;
using FluentAssertions;

namespace Hypesoft.Tests.Integration.Api;

public class ProductsValidationTests : IClassFixture<ApiFactory>
{
    private readonly HttpClient _client;

    public ProductsValidationTests(ApiFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task POST_products_WithoutAuth_ShouldReturn401()
    {
        var json = "{}";
        var res = await _client.PostAsync("/api/products",
            new StringContent(json, Encoding.UTF8, "application/json"));

        res.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }
}