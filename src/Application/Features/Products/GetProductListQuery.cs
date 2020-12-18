using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Products
{
    public class GetProductListQuery : IRequest<IQueryable<ProductItemDto>>
    {
    }

    class GetProductListQueryHandler : IRequestHandler<GetProductListQuery, IQueryable<ProductItemDto>>
    {
        private readonly IDbContext _db;
        private readonly IMapper _mapper;

        public GetProductListQueryHandler(IDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public Task<IQueryable<ProductItemDto>> Handle(
            GetProductListQuery request,
            CancellationToken cancellationToken)
        {
            var products = _db.Products
                .AsNoTracking()
                .ProjectTo<ProductItemDto>(_mapper.ConfigurationProvider);

            return Task.FromResult(products);
        }
    }
}