using AutoMapper;
using Domian.Entities;

namespace Application.Features.ProductTypes.GetAll
{
    public class GetAllProfile : Profile
    {
        public GetAllProfile()
        {
            CreateMap<ProductType, ProductTypeDto>(MemberList.Destination);
        }
    }
}
