using System.IO;

namespace Application.Common.Models
{
    public class FileDto
    {
        public string Name { get; set; }
        public string ContentType { get; set; }
        public Stream Content { get; set; }
    }
}
