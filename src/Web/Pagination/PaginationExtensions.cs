using System.Linq;

namespace Web.Pagination
{
    static class PaginationExtensions
    {
        public static IQueryable<TDto> ApplyPagination<TDto>(
            this IQueryable<TDto> source,
            PagedQuery query)
        {
            return source.Skip((query.PageNumber - 1) * query.PageSize).Take(query.PageSize);
        }
    }
}
