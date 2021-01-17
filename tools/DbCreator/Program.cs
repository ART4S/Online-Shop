using System;
using System.IO;
using System.Threading.Tasks;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace DbCreator
{
    class Program
    {
        private static async Task Main(string[] args)
        {
            IConfiguration config = BuildConfiguration();
            IServiceProvider services = BuildServiceProvider(config);

            await InitDbContext(services);
        }

        private static IConfiguration BuildConfiguration()
        {
            return new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
        }

        private static IServiceProvider BuildServiceProvider(IConfiguration configuration)
        {
            return new ServiceCollection()
                .AddLogging(configure =>
                {
                    configure.AddConsole();
                })
                .AddDbContext<AppDbContext>(options =>
                {
                    options.UseNpgsql(configuration.GetSection("ConnectionString").Value);
                })
                .BuildServiceProvider();
        }

        private static async Task InitDbContext(IServiceProvider services)
        {
            using IServiceScope scope = services.CreateScope();

            var logger = scope.ServiceProvider.GetService<ILogger<Program>>();

            logger.LogInformation("Start initializing db");

            try
            {
                await using var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                await ctx.Database.EnsureDeletedAsync();

                await ctx.Database.MigrateAsync();

                await DataSeed.SeedAsync(ctx, logger);
            }
            catch (Exception ex)
            {
                logger.LogCritical(ex, "Error while initializing db");
            }

            logger.LogInformation("Completed");
        }
    }
}