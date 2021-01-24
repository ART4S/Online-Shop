using System.Threading;
using System.Threading.Tasks;
using Domian.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Application.Interfaces
{
    public interface IDbContext
    {
        DbSet<Product> Products { get; }
        DbSet<ProductType> ProductTypes { get; }
        DbSet<ProductBrand> ProductBrands { get; }

        ChangeTracker ChangeTracker { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
