using MediatR;

namespace Hypesoft.Application.Categories.Commands;

public record UpdateCategoryCommand(
    string Id,       
    string NewId,    
    string Name      
) : IRequest;