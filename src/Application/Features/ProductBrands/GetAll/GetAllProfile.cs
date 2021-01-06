using AutoMapper;
using Domian.Entities;

namespace Application.Features.ProductBrands.GetAll
{
    public class GetAllProfile : Profile
    {
        public GetAllProfile()
        {
            CreateMap<ProductBrand, ProductBrandDto>(MemberList.Destination);
        }
    }
}
