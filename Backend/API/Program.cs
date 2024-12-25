using API.GraphQL;
using Core.Interfaces;
using GraphQL.Server.Ui.Voyager;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
var AllowSpecificOrigins = "_allowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddDbContextFactory<OMAContext>(options =>
{
    options.UseInMemoryDatabase("InMemoryDb");
});
builder.Services.AddSingleton<ICustomerService, CustomerService>();
builder.Services.AddSingleton<IOrderService, OrderService>();
// GraphQL
builder.Services.AddGraphQLServer().AddQueryType<Query>().AddFiltering();
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
var app = builder.Build();
app.UseCors(AllowSpecificOrigins);
app.MapGraphQL();
app.UseGraphQLVoyager("/graphql-voyager", new VoyagerOptions { GraphQLEndPoint = "/graphql" });
app.Run();
