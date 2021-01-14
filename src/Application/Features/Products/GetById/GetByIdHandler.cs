using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Services;
using AutoMapper;
using Domian.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Products.GetById
{
    public class GetByIdHandler : IRequestHandler<GetByIdQuery, ProductInfoDto>
    {
        private readonly IDbContext _db;
        private readonly IMapper _mapper;

        public GetByIdHandler(IDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ProductInfoDto> Handle(GetByIdQuery request, CancellationToken cancellationToken)
        {
            Product product = await _db.Products
                .AsNoTracking()
                .Include(x => x.Brand)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken)
            ?? throw new ObjectNotFoundException(request.Id);

            return _mapper.Map<ProductInfoDto>(product);
        }
    }
}
