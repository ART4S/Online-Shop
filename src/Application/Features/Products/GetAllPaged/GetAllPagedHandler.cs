using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Pagination;
using Application.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domian.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Products.GetAllPaged
{
    public class GetAllPagedHandler : IRequestHandler<GetAllPagedQuery, CatalogVm>
    {
        private readonly IDbContext _db;
        private readonly IMapper _mapper;

        public GetAllPagedHandler(IDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<CatalogVm> Handle(
            GetAllPagedQuery request,
            CancellationToken cancellationToken)
        {
            IQueryable<Product> products = _db.Products.AsNoTracking();

            if (request.Types.Count > 0)
                products = products.Where(x => request.Types.Contains(x.TypeId));

            if (request.Brands.Count > 0)
                products = products.Where(x => request.Brands.Contains(x.BrandId));

            if (request.Category.HasValue)
                products = products.Where(x => x.Category == request.Category);

            CatalogVm vm = await products
                .ProjectTo<ProductItemDto>(_mapper.ConfigurationProvider)
                .PaginateAsync(request);

            vm.TotalCount = await products.CountAsync(cancellationToken);

            return vm;
        }
    }
}