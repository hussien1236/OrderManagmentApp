using API.GraphQL;
using Core.Interfaces;
using Core.MappingProfiles;
using GraphQL.Server.Ui.Voyager;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}
// var ConnectionStrings = File.Exists("/run/secrets/connectionstring")
//     ? File.ReadAllText("/run/secrets/connectionstring").Trim()
//     : "DefaultJwtKey";
// var jwtKey = File.Exists("/run/secrets/jwt_secret_key")
//     ? File.ReadAllText("/run/secrets/jwt_secret_key").Trim()
//     : "DefaultJwtKey";
// var loginPassword = File.Exists("/run/secrets/login_password")
//     ? File.ReadAllText("/run/secrets/login_password").Trim()
//     : "DefaultPassword";
// builder.Configuration["Jwt:Key"] = jwtKey;
// builder.Configuration["Login:Password"] = loginPassword;
// builder.Configuration["ConnectionStrings:DefaultConnection"] = ConnectionStrings;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();
// Add services to the container.
builder.Services.AddDbContextFactory<OMAContext>(options =>
{
    options.UseNpgsql(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});
builder.Services.AddSingleton<ICustomerService, CustomerService>();
builder.Services.AddSingleton<IOrderService, OrderService>();
// GraphQL
builder.Services
.AddAuthorization()
.AddGraphQLServer()
.AddQueryType<Query>()
.AddMutationType<Mutation>()
.AddFiltering();
// Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_allowSpecificOrigins", policy =>
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
app.UseCors("_allowSpecificOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.UseMvc();
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
