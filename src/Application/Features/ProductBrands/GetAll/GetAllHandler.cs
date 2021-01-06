using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductBrands.GetAll
{
    public class GetAllHandler : IRequestHandler<GetAllQuery, IList<ProductBrandDto>>
    {
        private readonly IDbContext _db;
        private readonly IMapper _mapper;

        public GetAllHandler(IDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IList<ProductBrandDto>> Handle(
            GetAllQuery request, 
            CancellationToken cancellationToken)
        {
            var brands = await _db.ProductBrands
                .ProjectTo<ProductBrandDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return brands;
        }
    }
}