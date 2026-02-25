using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Categories.Queries;

public record GetCategoriesQuery() : IRequest<IReadOnlyList<CategoryDto>>;