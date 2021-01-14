using AutoMapper;
using Domian.Entities;

namespace Application.Features.Products.GetById
{
    public class GetByIdProfile : Profile
    {
        public GetByIdProfile()
        {
            CreateMap<Product, ProductInfoDto>(MemberList.Destination);
        }
    }
}
