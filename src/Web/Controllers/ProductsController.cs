using System.Threading.Tasks;
using Application.Features.Products.GetAllPaged;
using Application.Features.Products.GetById;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProductsController : BaseController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            return Ok(await Mediator.Send(new GetByIdQuery { Id = id }));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPaged(GetAllPagedQuery query)
        {
            return Ok(await Mediator.Send(query));
        }
    }
}
