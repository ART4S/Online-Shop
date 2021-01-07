using Application.Common.Requests;

namespace Application.Common.Pagination
{
    public class PagedQuery<TResult> : QueryBase<TResult>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = Constants.MaxPageSize;
    }
}
