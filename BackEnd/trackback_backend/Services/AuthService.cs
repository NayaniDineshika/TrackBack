using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using trackback_backend.Models;
using System.Security.Cryptography;

namespace trackback_backend.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;
        private readonly TrackBackDbContext _context;

        public AuthService(IConfiguration configuration, TrackBackDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public string RegisterUser(RegisterModel model)
        {
            // Check if user already exists
            if (_context.Users.Any(u => u.Email == model.Email))
            {
                throw new Exception("User already exists with this email.");
            }

            // Hash the password
            var passwordHash = HashPassword(model.Password);

            // Create new user
            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                PasswordHash = passwordHash
            };

            _context.Users.Add(user);
            _context.SaveChanges(); // Save to the database

            return GenerateJwtToken(user);
        }

        public AuthResponse Login(LoginModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
            {
                throw new Exception("Invalid credentials");
            }

            // Generate the token
            var token = GenerateJwtToken(user);

            // Return token and user ID in the response
            return new AuthResponse
            {
                Token = token,
                UserId = user.Id.ToString()  // Ensure UserId is returned as a string
            };
        }


        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            var hashedPassword = HashPassword(password);
            return hashedPassword == storedHash;
        }
    }
}
