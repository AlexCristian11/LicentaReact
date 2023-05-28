﻿using LicentaReact.Data;
using LicentaReact.DTOs;
using LicentaReact.Helpers;
using LicentaReact.Models;
using Microsoft.AspNetCore.Mvc;

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

			return Created("success", _repository.Create(user));
		}

		[HttpPost("login")]
		public IActionResult Login(LoginDto dto)
		{
			var user = _repository.GetByEmail(dto.Email);

			if (user == null)
			{
				return BadRequest(new { message = "Invalid Credentials" });
			}

			if (!BCrypt.Net.BCrypt.Verify(dto.Parola, user.Parola))
			{
				return BadRequest(new { message = "Invalid Credentials" });
			}

			var jwt = _jwtService.Generate(user.Id);

			Response.Cookies.Append("jwt", jwt, new CookieOptions
			{
				HttpOnly = true,
			});

			return Ok(new
			{
				message = "success"
			});
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

		[HttpPost("logout")]
		public IActionResult Logout() 
		{
			Response.Cookies.Delete("jwt");

			return Ok(new
			{
				message = "success"
			});
		}
	}
}
