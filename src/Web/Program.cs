using Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Web
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            IHost host = CreateHostBuilder(args).Build();

            await InitDbAsync(host);

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        static async Task InitDbAsync(IHost host)
        {
            using var scope = host.Services.CreateScope();

            try
            {
                AppDbContext context = scope.ServiceProvider.GetService<AppDbContext>();

                if (context.Database.IsRelational())
                {
                    await context.Database.MigrateAsync();
                }

                await context.SeedAsync();
            }
            catch (Exception ex)
            {
                var logger = scope.ServiceProvider.GetService<ILogger<Program>>();

                logger.LogCritical(ex, "Ошибка инициализации базы данных");
            }
        }
    }
}