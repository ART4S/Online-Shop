using System.Threading.Tasks;
using Application.Features.Carts.GetItems;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CartsController : BaseController
    {
        [HttpGet("items")]
        public async Task<IActionResult> GetItems([FromQuery] int[] itemIds)
        {
            return Ok(await Mediator.Send(new GetItemsQuery {ItemIds = itemIds}));
        }
    }
}
