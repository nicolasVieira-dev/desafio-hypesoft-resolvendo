using FluentValidation;

namespace Hypesoft.Application.Categories.Commands;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryValidator()
    {
        RuleFor(x => x.Id).NotEmpty().MinimumLength(2);
        RuleFor(x => x.Name).NotEmpty().MinimumLength(2);
    }
}