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
        public int BrandId { get; set; }
        public string BrandName { get; set; }
    }
}
