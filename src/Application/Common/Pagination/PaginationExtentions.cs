using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Pagination
{
    static class PaginationExtentions
    {
        public static async Task<PagedResponse<TDto>> PaginateAsync<TDto>(
            this IQueryable<TDto> source, 
            PagedQuery<TDto> request)
        {
            if (request.PageNumber < 1)
                throw new InvalidQueryException("Page number must be greather than 0");
            if (request.PageSize < 1)
                throw new InvalidQueryException("Page size must me greather than 0");
            if (request.PageNumber > Constants.MaxPageSize)
                throw new InvalidQueryException($"Max page must be less or equal {Constants.MaxPageSize}");

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
    }
}
