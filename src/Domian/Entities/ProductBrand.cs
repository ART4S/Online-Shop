using System.Collections.Generic;
using Domian.Common;

namespace Domian.Entities
{
    public class ProductBrand : BaseEntity
    {
        public ProductBrand()
        {
            Products = new HashSet<Product>();
        }

        public string Name { get; set; }

        public ICollection<Product> Products { get; }
    }
}
