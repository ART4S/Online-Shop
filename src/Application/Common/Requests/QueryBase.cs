using MediatR;

namespace Application.Common.Requests
{
    public abstract class QueryBase<TResult> : IRequest<TResult>
    {
    }
}
