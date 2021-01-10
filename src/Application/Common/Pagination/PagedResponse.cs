using System.Collections.Generic;

namespace Application.Common.Pagination
{
    public class PagedResponse<TDto>
    {
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalItemsCount { get; set; }
        public bool HasPrevPage => CurrentPage > 1;
        public bool HasNextPage => CurrentPage < TotalPages;
        public IList<TDto> Items { get; set; }
    }
}
