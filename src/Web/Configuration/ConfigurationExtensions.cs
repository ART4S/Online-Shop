using Microsoft.AspNetCore.Builder;
using Web.Middlewares;

namespace Web.Configuration
{
    static class ConfigurationExtensions
    {
        public static void UseExceptionHandling(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandlerMiddleware>();
        }
    }
}
