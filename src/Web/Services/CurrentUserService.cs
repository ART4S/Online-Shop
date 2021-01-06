using System.Security.Claims;
using Application.Services;
using Microsoft.AspNetCore.Http;
using Web.Exceptions;

namespace Web.Services
{
    class CurrentUserService : ICurrentUserService
    {
        private string _userId;
        private readonly HttpContext _httpContext;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor.HttpContext;
        }

        public string GetUserId()
        {
            if (_userId is not null) return _userId;

            Claim userId = _httpContext?.User.FindFirst(ClaimTypes.NameIdentifier);

            if (userId is null)
                throw new NotAuthenticatedException();

            _userId = userId.Value;

            return _userId;
        }
    }
}
