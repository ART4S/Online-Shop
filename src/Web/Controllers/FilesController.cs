using System.Threading.Tasks;
using Application.Common.Models;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    public class FilesController : BaseController
    {
        private readonly IFileRepository _fileRepo;

        public FilesController(IFileRepository fileRepo)
        {
            _fileRepo = fileRepo;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            await using var fs = file.OpenReadStream();

            string id = await _fileRepo.AddAsync(new FileDto
            {
                Content = fs,
                ContentType = file.ContentType,
                Name = file.FileName
            });

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Download(string id)
        {
            FileDto file = await _fileRepo.GetByIdAsync(id);

            if (file is null)
            {
                return NotFound();
            }

            return File(file.Content, file.ContentType, file.Name);
        }
    }
}
