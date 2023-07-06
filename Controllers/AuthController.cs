using LicentaReact.Data;
using LicentaReact.DTOs;
using LicentaReact.Helpers;
using LicentaReact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LicentaReact.Controllers
{
	[Route("api")]
	[ApiController]
	public class AuthController : Controller
	{
		private readonly IUserRepository _repository;
		private readonly JwtService _jwtService;
		public AuthController(IUserRepository repository, JwtService jwtService)
		{
			_repository = repository;
			_jwtService = jwtService;
		}

		[HttpPost("register")]
		public IActionResult Register(RegisterDto dto)
		{
			var user = new User
			{
				Nume = dto.Nume,
				Prenume = dto.Prenume,
				Email = dto.Email,
				Adresa = dto.Adresa,
				Parola = BCrypt.Net.BCrypt.HashPassword(dto.Parola),
			};

			_repository.Create(user);

			return Ok(new { message = "User created successfully." });
		}

		[HttpPost("login")]
		public IActionResult Login(LoginDto dto)
		{
			var user = _repository.GetByEmail(dto.Email);

			if (user == null)
			{
				return Unauthorized(new { message = "Invalid email or password." });
			}

			if (!BCrypt.Net.BCrypt.Verify(dto.Parola, user.Parola))
			{
				return Unauthorized(new { message = "Invalid email or password." });
			}

			var jwt = _jwtService.Generate(user.Id);

			Response.Cookies.Append("jwt", jwt, new CookieOptions
			{
				HttpOnly = true,
			});

			var userData = new
			{
				user.Id,
				user.Prenume,
			};

			return Ok(userData);
		}

		[HttpGet("user")]
		public IActionResult User()
		{
			try
			{
				var jwt = Request.Cookies["jwt"];

				var token = _jwtService.Verify(jwt);

				int userId = int.Parse(token.Issuer);

				var user = _repository.GetById(userId);

				return Ok(user);
			}
			catch (Exception)
			{
				return Unauthorized();
			}

		}

		[HttpGet("user/{userId}")]
		public IActionResult GetUserById(int userId)
		{
			try
			{
				var user = _repository.GetById(userId);

				if (user == null)
				{
					return NotFound();
				}

				return Ok(user);
			}
			catch (Exception)
			{
				return StatusCode(500, "Internal server error");
			}
		}

		[HttpPost("logout")]
		public IActionResult Logout()
		{
			Response.Cookies.Delete("jwt");

			return Ok(new
			{
				message = "success"
			});
		}

		[HttpDelete("users/{userId}")]
		public IActionResult DeleteUser(int userId)
		{
			try
			{
				_repository.DeleteUser(userId);
				return Ok("User deleted successfully.");
			}
			catch (Exception)
			{
				return StatusCode(500, "Internal server error");
			}
		}
	}
}
