using Microsoft.EntityFrameworkCore;
using PartInspectorApi;
using PartInspectorDb;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);

//builder.Services.AddDbContext<PartInspectorDbContext>(options =>
//{
//    options.UseSqlServer(builder.Configuration
//        .GetConnectionString("InspectorConnection"));
//});

var app = builder.Build();

// Checks that the DB Context is being build properly
//using (var scope = app.Services.CreateScope())
//{
//    var dbContext = scope.ServiceProvider.
//        GetRequiredService<PartInspectorDbContext>();

//    if (!dbContext.Database.CanConnect())
//    {
//        throw new NotImplementedException("Cannot connect to the Database");
//    }
//}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
