using Application.Common.Pagination;

namespace Application.Features.Products.GetAllPaged
{
    public class CatalogVm : PagedResponse<ProductItemDto>
    {
        public int TotalCount { get; set; }
    }
}
