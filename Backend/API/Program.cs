using API.GraphQL;
using Core.Interfaces;
using Core.MappingProfiles;
using GraphQL.Server.Ui.Voyager;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
var AllowSpecificOrigins = "_allowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}
// Add services to the container.
builder.Services.AddDbContextFactory<OMAContext>(options =>
{
    options.UseNpgsql(builder.Configuration["ConnectionStrings:DefaultConnection"]);
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
builder.Services.AddControllers(option => option.EnableEndpointRouting = false);
var app = builder.Build();
app.UseRouting();
app.UseMvc();
app.UseStaticFiles();

app.UseCors(AllowSpecificOrigins);
app.MapGraphQL();
app.UseGraphQLVoyager("/graphql-voyager", new VoyagerOptions { GraphQLEndPoint = "/graphql" });
app.MapFallbackToFile("index.html");
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
