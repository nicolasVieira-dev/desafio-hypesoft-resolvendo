using FluentAssertions;

namespace Hypesoft.Tests.Integration.Api;

public class HealthTests : IClassFixture<ApiFactory>
{
    private readonly HttpClient _client;

    public HealthTests(ApiFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GET_health_ShouldReturn200()
    {
        var res = await _client.GetAsync("/health");
        res.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
    }
}