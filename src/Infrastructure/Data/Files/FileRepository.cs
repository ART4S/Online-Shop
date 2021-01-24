using System.IO;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Interfaces;

namespace Infrastructure.Data.Files
{
    public class FileRepository : IFileRepository
    {
        private readonly AppDbContext _context;

        public FileRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> AddAsync(FileDto fileDto)
        {
            var file = new File
            {
                Name = fileDto.Name,
                ContentType = fileDto.ContentType
            };

            await using (var ms = new MemoryStream())
            {
                await fileDto.Content.CopyToAsync(ms);
                file.Content = ms.ToArray();
            }

            await _context.AddAsync(file);
            await _context.SaveChangesAsync();

            return file.Id;
        }

        public async Task<FileDto> GetByIdAsync(string id)
        {
            File file = await _context.Files.FindAsync(id);

            if (file is null) return null;

            return new FileDto
            {
                Name = file.Name,
                ContentType = file.ContentType,
                Content = new MemoryStream(file.Content)
            };
        }
    }
}
