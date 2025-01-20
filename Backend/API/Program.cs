using API.GraphQL;
using Core.Interfaces;
using Core.MappingProfiles;
using GraphQL.Server.Ui.Voyager;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
var AllowSpecificOrigins = "_allowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddDbContextFactory<OMAContext>(options =>
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});
builder.Services.AddSingleton<ICustomerService, CustomerService>();
builder.Services.AddSingleton<IOrderService, OrderService>();
// GraphQL
builder.Services
.AddGraphQLServer()
.AddQueryType<Query>()
.AddMutationType<Mutation>()
.AddFiltering();
// Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins, policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
}
);
// Auto Mapper
builder.Services.AddAutoMapper(typeof(MappingProfile));
var app = builder.Build();
app.UseCors(AllowSpecificOrigins);
app.MapGraphQL();
app.UseGraphQLVoyager("/graphql-voyager", new VoyagerOptions { GraphQLEndPoint = "/graphql" });

// Migrate Database

try
{
    var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<OMAContext>();
    context.Database.Migrate();
}
catch (Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred while migrating the database.");
}

app.Run();
