using Domian.Common;
using Domian.Enums;

namespace Domian.Entities
{
    public class Product : AuditableEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public decimal? Price { get; set; }
        public string MainPictureId { get; set; }
        public string[] PictureIds { get; set; }

        public int BrandId { get; set; }
        public ProductBrand Brand { get; set; }

        public int TypeId { get; set; }
        public ProductType Type { get; set; }

        public ProductCategory? Category { get; set; }
    }
}