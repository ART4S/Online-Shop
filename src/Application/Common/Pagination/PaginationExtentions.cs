using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Pagination
{
    static class PaginationExtentions
    {
        public static async Task<PagedResponse<TDto>> PaginateAsync<TDto>(
            this IQueryable<TDto> source, 
            PagedQuery<TDto> request)
        {
            CheckRequest(request);

            var result = new PagedResponse<TDto>
            {
                CurrentPage = request.PageNumber, 
                TotalItemsCount = await source.CountAsync()
            };

            result.TotalPages = (int)Math.Ceiling(
                result.TotalItemsCount / (double)request.PageSize);

            result.Items = await source
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            result.PageSize = result.Items.Count;

            return result;
        }

        public static async Task<PagedResponse<TDto>> PaginateAndProjectAsync<TEntity, TDto>(
            this IQueryable<TEntity> source, 
            PagedQuery<TDto> request, 
            IMapper mapper,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> beforeMap = null,
            Func<IQueryable<TDto>, IQueryable<TDto>> afterMap = null)
        {
            CheckRequest(request);

            var result = new PagedResponse<TDto>
            {
                CurrentPage = request.PageNumber,
                TotalItemsCount = await source.CountAsync()
            };

            result.TotalPages = (int)Math.Ceiling(
                result.TotalItemsCount / (double)request.PageSize);

            source = source
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize);

            if (beforeMap is not null)
                source = beforeMap(source);

            var dto = source.ProjectTo<TDto>(mapper.ConfigurationProvider);

            if (afterMap is not null)
                dto = afterMap(dto);

            result.Items = await dto.ToListAsync();

            result.PageSize = result.Items.Count;

            return result;
        }

        private static void CheckRequest<TResult>(PagedQuery<TResult> request)
        {
            if (request.PageNumber < 1)
                throw new InvalidQueryException("Page number must be greather than 0");
            if (request.PageSize < 1)
                throw new InvalidQueryException("Page size must me greather than 0");
            if (request.PageNumber > Constants.MaxPageSize)
                throw new InvalidQueryException($"Max page must be less or equal {Constants.MaxPageSize}");
        }
    }
}
