using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Domian.Common;
using Domian.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;

namespace DbCreator
{
    static class DataSeed
    {
        private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        public static async Task SeedAsync(DbContext context, ILogger logger)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "Data");

            string[] files = Directory.GetFiles(path, "*.json", SearchOption.AllDirectories);

            foreach (string filePath in files)
            {
                string fileName = Path.GetFileNameWithoutExtension(filePath);

                if (FileNameToEntityTypeMap.TryGetValue(fileName, out Type entityType))
                {
                    try
                    {
                        await using FileStream file = File.OpenRead(filePath);

                        var entityListType = typeof(List<>).MakeGenericType(entityType);

                        var entities = (IEnumerable<object>)await JsonSerializer.DeserializeAsync(
                            file,
                            entityListType,
                            JsonOptions);

                        await context.AddRangeAsync(entities!);
                    }
                    catch(Exception ex)
                    {
                        logger.LogError(ex, "Ошибка в процессе обработки файла");
                    }
                }
                else
                {
                    logger.LogWarning($"Для файла '{filePath}' не найден подходящий тип");
                }
            }

            SetAuditData(context);

            await context.SaveChangesAsync();
        }

        private static void SetAuditData(DbContext context)
        {
            var auditableEntities = 
                context.ChangeTracker.Entries<AuditableEntity>();

            var now = DateTime.Now;

            foreach (EntityEntry<AuditableEntity> entry in auditableEntities)
            {
                entry.Entity.CreateDate = now;
            }
        }

        private static readonly Dictionary<string, Type> FileNameToEntityTypeMap =
            new Dictionary<string, Type>
            {
                ["Products"] = typeof(Product),
                ["ProductBrands"] = typeof(ProductBrand),
                ["ProductTypes"] = typeof(ProductType)
            };
    }
}