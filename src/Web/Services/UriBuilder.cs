using Application.Services;
using Microsoft.AspNetCore.Http;

namespace Web.Services
{
    class UriBuilder : IUriBuilder
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public UriBuilder(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public string GetPictureUrl(string pictureId)
        {
            HttpRequest request = _contextAccessor.HttpContext!.Request;

            return $"{request.Scheme}://{request.Host}{request.PathBase}/api/files/{pictureId}";
        }
    }
}
