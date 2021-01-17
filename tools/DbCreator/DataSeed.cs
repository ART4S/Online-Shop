using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Domian.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;
using AppFile = Infrastructure.Data.Files.File;

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
            await SeedEntitiesAsync(context, logger);

            await SeedImagesAsync(context, logger);

            SetAuditData(context);

            await context.SaveChangesAsync();
        }

        private static async Task SeedEntitiesAsync(DbContext context, ILogger logger)
        {
            logger.LogInformation("start seeding entities");

            string path = Path.Combine(Directory.GetCurrentDirectory(), "Data\\Model");

            string[] files = Directory.GetFiles(path, "*.json");

            Dictionary<string, Type> entityTypes = GetEntityTypes(context);

            foreach (string filePath in files)
            {
                string fileName = Path.GetFileNameWithoutExtension(filePath).ToLower();

                if (entityTypes.TryGetValue(fileName, out Type entityType))
                {
                    try
                    {
                        await using FileStream file = File.OpenRead(filePath);

                        var entities = (IEnumerable<object>)await JsonSerializer.DeserializeAsync(
                            file,
                            typeof(List<>).MakeGenericType(entityType),
                            JsonOptions);

                        await context.AddRangeAsync(entities!);
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, "Ошибка в процессе обработки файла");
                    }
                }
                else
                {
                    logger.LogWarning($"Для файла '{filePath}' не найден подходящий тип");
                }
            }

            logger.LogInformation("finish seeding entities");
        }

        private static Dictionary<string, Type> GetEntityTypes(DbContext context)
        {
            return context.GetType()
                .GetProperties()
                .Where(x => x.PropertyType.IsGenericType
                    && x.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>))
                .Select(x => x.PropertyType.GetGenericArguments()[0])
                .ToDictionary(x => x.Name.ToLower(), x => x);
        }

        private static async Task SeedImagesAsync(DbContext context, ILogger logger)
        {
            logger.LogInformation("start seeding images");

            string path = Path.Combine(Directory.GetCurrentDirectory(), "Data\\Images");

            string[] files = Directory.GetFiles(path, "*.*");

            foreach (string filePath in files)
            {
                var file = new AppFile
                {
                    Id = Path.GetFileNameWithoutExtension(filePath),
                    Name = Path.GetFileNameWithoutExtension(filePath),
                    ContentType = $"image/{Path.GetExtension(filePath).Replace(".", "")}"
                };

                try
                {
                    file.Content = await File.ReadAllBytesAsync(filePath);
                }
                catch (Exception e)
                {
                    logger.LogError(e, $"error while reading file '{filePath}'");
                }

                await context.AddAsync(file);
            }

            logger.LogInformation("finish seeding images");
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
    }
}