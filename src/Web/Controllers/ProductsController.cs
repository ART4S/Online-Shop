using System.Threading.Tasks;
using Application.Features.Products;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;
using Web.Pagination;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProductsController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Get(PagedQuery request)
        {
            return Ok((await Mediator.Send(new GetProductListQuery())).ApplyPagination(request));
        }
    }
}
