using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

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
                    var logger = ctx.RequestServices.GetService<ILogger>();

                    logger.LogError(ex, "Ошибка запроса");
                }
            });
        }
    }
}
