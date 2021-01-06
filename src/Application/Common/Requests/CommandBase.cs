using MediatR;

namespace Application.Common.Requests
{
    public abstract class CommandBase<T> : IRequest<T>
    {
    }
}
