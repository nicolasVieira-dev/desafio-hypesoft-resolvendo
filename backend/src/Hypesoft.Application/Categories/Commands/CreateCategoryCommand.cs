using MediatR;

namespace Hypesoft.Application.Categories.Commands;

public record CreateCategoryCommand(string Id, string Name) : IRequest<string>;