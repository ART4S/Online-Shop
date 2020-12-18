using Domian.Common;

namespace Domian.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}