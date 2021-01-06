using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Web.Configuration
{
    static class ConfigurationExtensions
    {
        public static void UseExceptionHandling(this IApplicationBuilder app)
        {
            app.Use(async (ctx, next) =>
            {
                try
                {
                    await next();
                }
                catch (Exception ex)
                {
                    ILogger logger = ctx.RequestServices
                        .GetService<ILoggerFactory>()!
                        .CreateLogger("RequestErrors");

                    logger.LogError(ex, "Ошибка запроса");
                }
            });
        }
    }
}
