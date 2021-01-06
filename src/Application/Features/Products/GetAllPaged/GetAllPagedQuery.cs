using System.Collections.Generic;
using Application.Common.Pagination;
using Domian.Enums;

namespace Application.Features.Products.GetAllPaged
{
    public class GetAllPagedQuery : PagedQuery<ProductItemDto>
    {
        public ProductCategory? Category { get; set; }
        public IList<int> Brands { get; set; } = new List<int>();
        public IList<int> Types { get; set; } = new List<int>();
    }
}