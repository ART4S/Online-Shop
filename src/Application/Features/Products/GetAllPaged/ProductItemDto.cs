using System;
using Domian.Enums;

namespace Application.Features.Products.GetAllPaged
{
    public class ProductItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }
        public string PictureUrl { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public ProductCategory? Category { get; set; }
    }
}
