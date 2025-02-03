using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<AuthController> logger;
        public AuthController(IConfiguration config, ILogger<AuthController> logger)
        {
            this.logger = logger;
            _config = config;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            logger.LogInformation("---------------------------" + model.Username + "is not equal to" + _config["Login:Username"] + "---------------------------");
            logger.LogInformation("---------------------------" + model.Password + "is not equal to" + _config["Login:Password"] + "---------------------------");
            if (model.Username == _config["Login:Username"] && model.Password == _config["Login:Password"])
            {
                var token = GenerateToken(model.Username);
                logger.LogInformation("---------------------------" + token + "---------------------------");
                return Ok(new { token });
            }
            return Unauthorized();
        }
        private string GenerateToken(string username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}