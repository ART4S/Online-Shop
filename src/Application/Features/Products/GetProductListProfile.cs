using AutoMapper;
using Domian.Entities;

namespace Application.Features.Products
{
    public class GetProductListProfile : Profile
    {
        public GetProductListProfile()
        {
            CreateMap<Product, ProductItemDto>(MemberList.Destination);
        }
    }
}
