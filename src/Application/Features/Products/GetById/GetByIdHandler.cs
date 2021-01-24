using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Interfaces;
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
        private readonly IUriBuilder _uriBuilder;

        public GetByIdHandler(IDbContext db, IMapper mapper, IUriBuilder uriBuilder)
        {
            _db = db;
            _mapper = mapper;
            _uriBuilder = uriBuilder;
        }

        public async Task<ProductInfoDto> Handle(GetByIdQuery request, CancellationToken cancellationToken)
        {
            Product product = await _db.Products
                .AsNoTracking()
                .Include(x => x.Brand)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken)
            ?? throw new NotFoundException(request.Id);

            var dto = _mapper.Map<ProductInfoDto>(product);

            if (!string.IsNullOrEmpty(product.MainPictureId))
            {
                dto.PictureUrl = _uriBuilder.GetPictureUrl(product.MainPictureId);
                dto.PictureUrls.Add(dto.PictureUrl);
            }

            if (product.PictureIds is not null)
            {
                foreach (string picId in product.PictureIds)
                {
                    dto.PictureUrls.Add(_uriBuilder.GetPictureUrl(picId));
                }
            }

            return dto;
        }
    }
}
