using Application.Common.Requests;

namespace Application.Features.Products.GetById
{
    public class GetByIdQuery : QueryBase<ProductInfoDto>
    {
        public int Id { get; set; }
    }
}
