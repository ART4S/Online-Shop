using System;

namespace Domian.Common
{
    public class AuditableEntity : BaseEntity
    {
        public DateTime CreateDate { get; set; }
        public string CreateUserId { get; set; }

        public DateTime? UpdateDate { get; set; }
        public string UpdateUserId { get; set; }
    }
}
