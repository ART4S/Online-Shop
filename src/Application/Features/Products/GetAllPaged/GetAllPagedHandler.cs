using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Enums;
using Application.Common.Pagination;
using Application.Services;
using AutoMapper;
using Domian.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Products.GetAllPaged
{
    public class GetAllPagedHandler : IRequestHandler<GetAllPagedQuery, PagedResponse<ProductItemDto>>
    {
        private readonly IDbContext _db;
        private readonly IMapper _mapper;

        public GetAllPagedHandler(IDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<PagedResponse<ProductItemDto>> Handle(
            GetAllPagedQuery request,
            CancellationToken cancellationToken)
        {
            IQueryable<Product> products = _db.Products.AsNoTracking();

            products = ApplyFilters(products, request);

            PagedResponse<ProductItemDto> response = 
                await products.PaginateAndMapAsync(
                    request, _mapper, x => ApplySort(x, request.SortDirection));

            return response;
        }

        private static IQueryable<Product> ApplyFilters(IQueryable<Product> products, GetAllPagedQuery request)
        {
            if (request.Types.Count > 0)
                products = products.Where(x => request.Types.Contains(x.TypeId));

            if (request.Brands.Count > 0)
                products = products.Where(x => request.Brands.Contains(x.BrandId));

            if (request.Category.HasValue)
                products = products.Where(x => x.Category == request.Category);

            if (request.MinPrice.HasValue)
                products = products.Where(x => x.Price >= request.MinPrice);

            if (request.MaxPrice.HasValue)
                products = products.Where(x => x.Price <= request.MaxPrice);

            return products;
        }

        private static IQueryable<Product> ApplySort(IQueryable<Product> products, SortDirection? direction)
        {
            return direction switch
            {
                SortDirection.PriceUp => products.OrderBy(x => x.Price),
                SortDirection.PriceDown => products.OrderByDescending(x => x.Price),
                SortDirection.Newly => products.OrderBy(x => x.UpdateDate ?? x.CreateDate),
                _ => products
            };
        }
    }
}