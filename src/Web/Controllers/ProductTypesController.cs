using System.Threading.Tasks;
using Application.Features.ProductTypes.GetAll;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProductTypesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll(GetAllQuery query)
        {
            return Ok(await Mediator.Send(query));
        }
    }
}