using System.Threading;
using System.Threading.Tasks;
using Application.Common.Requests;
using Application.Services;
using Domian.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Application.Common.Behaviours
{
    public class SaveChangesBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : CommandBase<TResponse>
    {
        private readonly IDbContext _db;
        private readonly IDateTime _dateTime;
        private readonly ICurrentUserService _currentUser;

        public SaveChangesBehaviour(IDbContext db, IDateTime dateTime, ICurrentUserService currentUser)
        {
            _db = db;
            _dateTime = dateTime;
            _currentUser = currentUser;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            TResponse response = await next();

            SetAuditData();

            await _db.SaveChangesAsync(cancellationToken);

            return response;
        }

        private void SetAuditData()
        {
            var auditableEntities = _db.ChangeTracker.Entries<AuditableEntity>();

            foreach (EntityEntry<AuditableEntity> entry in auditableEntities)
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                        entry.Entity.UpdateUserId = _currentUser.GetUserId();
                        entry.Entity.UpdateDate = _dateTime.Now;
                        break;
                    case EntityState.Added:
                        entry.Entity.CreateUserId = _currentUser.GetUserId();
                        entry.Entity.CreateDate = _dateTime.Now;
                        break;
                }
            }
        }
    }
}