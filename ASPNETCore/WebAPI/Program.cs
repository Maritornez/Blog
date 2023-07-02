using System.Text.Json.Serialization;
using ASPNetCoreApp.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddIdentity<User, IdentityRole>()
 .AddEntityFrameworkStores<BloggingContext>();
builder.Services.AddDbContext<BloggingContext>();

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var bloggingContext = scope.ServiceProvider.GetRequiredService<BloggingContext>();
    await BloggingContextSeed.SeedAsync(bloggingContext);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
