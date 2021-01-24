using System;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Web.Exceptions;

namespace Web.Middlewares
{
    public class ExceptionHandlerMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch(Exception ex)
            {
                if (context.Response.HasStarted)
                {
                    var logger = context.RequestServices
                        .GetService<ILogger<ExceptionHandlerMiddleware>>();

                    logger.LogError(ex, "Exception cannot be handled: response has started");
                }
                else
                {
                    await HandleExceptionAsync(ex, context);
                }
            }
        }

        private static async Task HandleExceptionAsync(Exception exception, HttpContext context)
        {
            switch (exception)
            {
                case IUserMessageError error:
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsJsonAsync(new { error = error.Message });
                    return;
                case NotAuthenticatedException error:
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsJsonAsync(new { error = error.Message });
                    return;
                default:
                    var logger = context.RequestServices
                        .GetService<ILogger<ExceptionHandlerMiddleware>>();

                    logger.LogError(exception, "Unknown exception type");

                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    await context.Response.WriteAsJsonAsync(new { error = "Something went wrong" });

                    return;
            }
        }
    }
}