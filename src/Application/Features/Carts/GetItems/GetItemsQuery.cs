using System.Collections.Generic;
using Application.Common.Requests;

namespace Application.Features.Carts.GetItems
{
    public class GetItemsQuery : QueryBase<IList<CartItemDto>>
    {
        public int[] ItemIds { get; set; }
    }
}
