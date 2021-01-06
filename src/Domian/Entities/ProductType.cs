using System.Collections.Generic;
using Domian.Common;

namespace Domian.Entities
{
    public class ProductType : BaseEntity
    {
        public ProductType()
        {
            Products = new HashSet<Product>();
        }

        public string Name { get; set; }

        public ICollection<Product> Products { get; }
    }
}
