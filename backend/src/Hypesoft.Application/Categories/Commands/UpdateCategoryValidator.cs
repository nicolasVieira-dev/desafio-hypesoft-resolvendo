using FluentValidation;

namespace Hypesoft.Application.Categories.Commands;

public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryCommand>
{
    public UpdateCategoryValidator()
    {
        RuleFor(x => x.Id).NotEmpty().MinimumLength(2);
        RuleFor(x => x.NewId).NotEmpty().MinimumLength(2);
        RuleFor(x => x.Name).NotEmpty().MinimumLength(2);
    }
}