using Microsoft.AspNetCore.Mvc;

namespace Web.Pagination
{
    public class PagedQuery
    {
        [FromQuery(Name = "number")]
        public int PageNumber { get; set; }

        [FromQuery(Name = "size")]
        public int PageSize { get; set; }
    }
}
