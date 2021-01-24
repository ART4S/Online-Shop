using System.Threading.Tasks;
using Application.Common.Models;

namespace Application.Interfaces
{
    public interface IFileRepository
    {
        Task<FileDto> GetByIdAsync(string id);
        Task<string> AddAsync(FileDto file);
    }
}
