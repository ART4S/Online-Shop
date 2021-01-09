using System.Collections.Generic;
using Application.Common.Enums;
using Application.Common.Pagination;
using Domian.Enums;

namespace Application.Features.Products.GetAllPaged
{
    public class GetAllPagedQuery : PagedQuery<CatalogVm>
    {
        public ProductCategory? Category { get; set; }
        public SortDirection? SortDirection { get; set; }
        public IList<int> Brands { get; set; } = new List<int>();
        public IList<int> Types { get; set; } = new List<int>();
    }
}