using Application.Features.Products;
using Application.Features.Products.GetProductList;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Web.Controllers.Base;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProductsController : BaseController
    {
        [HttpGet]
        [ProducesResponseType(typeof(IQueryable<ProductItemDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            return Ok(await Mediator.Send(new GetProductListQuery()));
        }
    }
}
