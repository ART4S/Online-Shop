using System.Text.Json.Serialization;
using Application.Common.Behaviours;
using Application.Interfaces;
using AutoMapper;
using Infrastructure.Data;
using Infrastructure.Data.Files;
using Infrastructure.Services;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Web.Configuration;
using Web.Middlewares;
using Web.Services;

namespace Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();

            services.AddScoped<IFileRepository, FileRepository>();

            services.AddControllers()
                .AddJsonOptions(configure =>
                {
                    configure.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    configure.JsonSerializerOptions.WriteIndented = !Environment.IsProduction();
                });

            services.AddDbContext<AppDbContext>(builder =>
            {
                builder.UseNpgsql(
                    Configuration.GetConnectionString("Default"),
                    b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName));
            });

            services.AddScoped<IDbContext, AppDbContext>();

            services.AddAutoMapper(typeof(IDbContext).Assembly);

            services.AddMediatR(typeof(IDbContext).Assembly);

            services.AddCors(setup =>
            {
                setup.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:4200");
                });
            });

            services.AddSingleton<IDateTime, DateTimeService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();

            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(SaveChangesBehaviour<,>));

            services.AddHttpContextAccessor();

            services.AddScoped<IUriBuilder, UriBuilder>();

            services.AddScoped<ExceptionHandlerMiddleware>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseExceptionHandling();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}