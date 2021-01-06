using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProductTypes.GetAll
{
    public class GetAllHandler : IRequestHandler<GetAllQuery, IList<ProductTypeDto>>
    {
        private readonly IDbContext _db;
        private readonly IMapper _mapper;

        public GetAllHandler(IDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IList<ProductTypeDto>> Handle(
            GetAllQuery request, 
            CancellationToken cancellationToken)
        {
            var types = await _db.ProductTypes
                .ProjectTo<ProductTypeDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return types;
        }
    }
}