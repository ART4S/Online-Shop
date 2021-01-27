using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Carts.GetItems
{
    public class GetItemsHandler : IRequestHandler<GetItemsQuery, IList<CartItemDto>>
    {
        private readonly IDbContext _db;
        private readonly IMapper _mapper;

        public GetItemsHandler(IDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IList<CartItemDto>> Handle(
            GetItemsQuery request, 
            CancellationToken cancellationToken)
        {
             List<CartItemDto> items = await _db.Products
                 .Where(x => request.ItemIds.Contains(x.Id))
                 .AsNoTracking()
                 .ProjectTo<CartItemDto>(_mapper.ConfigurationProvider)
                 .ToListAsync(cancellationToken);

             return items;
        }
    }
}
