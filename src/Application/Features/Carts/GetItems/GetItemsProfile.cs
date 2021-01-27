using AutoMapper;
using Domian.Entities;

namespace Application.Features.Carts.GetItems
{
    public class GetItemsProfile : Profile
    {
        public GetItemsProfile()
        {
            CreateMap<Product, CartItemDto>(MemberList.Destination)
                .ForMember(src => src.PictureUrl, opt => opt.MapFrom(dest => dest.MainPictureId));
        }
    }
}
