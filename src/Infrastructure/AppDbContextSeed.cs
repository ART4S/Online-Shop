using Domian.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure
{
    public static class AppDbContextSeed
    {
        public static async Task SeedAsync(this AppDbContext context)
        {
            if (context.Products.Any()) return;

            await context.Products.AddRangeAsync(
                new Product() { Name = "ProductA" },
                new Product() { Name = "ProductB" });

            await context.SaveChangesAsync();
        }
    }
}
