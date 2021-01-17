using System.Collections.Generic;

namespace Application.Features.Products.GetById
{
    public class ProductInfoDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public string PictureUrl { get; set; }
        public IList<string> PictureUrls { get; set; } = new List<string>();
        public int BrandId { get; set; }
        public string BrandName { get; set; }
    }
}
