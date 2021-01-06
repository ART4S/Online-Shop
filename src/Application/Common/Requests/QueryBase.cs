using MediatR;

namespace Application.Common.Requests
{
    public abstract class QueryBase<T> : IRequest<T>
    {
    }
}
