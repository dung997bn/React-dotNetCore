using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Middleware
{
    public class ErrorsHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorsHandlingMiddleware> _logger;

        public ErrorsHandlingMiddleware(RequestDelegate next, ILogger<ErrorsHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {

                await HandleExceptionAsync(context, ex, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorsHandlingMiddleware> logger)
        {
            object errors = null;

            switch (ex)
            {
                case RestException re:
                    logger.LogError(ex, "REST ERROR");
                    errors = re.Errors;
                    context.Response.StatusCode = (int)re.Code;
                    break;

                case Exception e:
                    logger.LogError(ex, "SERVER ERROR");
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            context.Response.ContentType = "applicaion/json";
            if (errors != null)
            {
                var result = JsonConvert.SerializeObject(new
                {
                    errors
                });

                await context.Response.WriteAsync(result);
            }
        }
    }
}
