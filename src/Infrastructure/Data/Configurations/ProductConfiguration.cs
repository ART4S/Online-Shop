using System;
using System.Linq;
using Domian.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            string separator = ",";

            var comparer = new ValueComparer<string[]>(
                (x, y) => x.SequenceEqual(y),
                x => x.Aggregate(0, (i, j) => HashCode.Combine(i, j.GetHashCode())));

            builder.Property(x => x.PictureIds)
                .HasConversion(
                    x => string.Join(separator, x),
                    x => x.Split(separator, StringSplitOptions.RemoveEmptyEntries),
                    comparer);
        }
    }
}
