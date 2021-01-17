using System;

namespace Infrastructure.Data.Files
{
    public class File
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string ContentType { get; set; }
        public byte[] Content { get; set; }

        public File()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}
