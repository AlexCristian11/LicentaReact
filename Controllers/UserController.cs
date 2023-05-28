using LicentaReact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;
using System.Text;
using System.Xml.Linq;

namespace LicentaReact.Controllers
{
	//	public class UserController
	//	{
	//		[Authorize]
	//		[ApiController]
	//		public class UserControllers : Controller
	//		{

	//			private readonly IConfiguration _configuration;
	//			private readonly ILoginService _loginService;
	//			private readonly ICommonEmailsService _emailService;
	//			private readonly IResetPasswordRequestsService _resetPasswordRequestsService;

	//			public UserControllers(IConfiguration configuration, ILoginService loginService, ICommonEmailsService emailService, IResetPasswordRequestsService resetPasswordRequestsService)
	//			{
	//				_configuration = configuration;
	//				_loginService = loginService;
	//				_emailService = emailService;
	//				_resetPasswordRequestsService = resetPasswordRequestsService;
	//			}

	//			[AllowAnonymous]
	//			[HttpPost]
	//			[Route("users/login")]
	//			public async Task<ActionResult<string>> Login([FromBody] UserLoginDTO claimedUser)
	//			{
	//				var userResult = await _loginService.Login(claimedUser.Email, claimedUser.Password, claimedUser.HostUri);
	//				if (!userResult.Success)
	//				{
	//					if (userResult.HttpErrorCode == 403)
	//					{
	//						return Forbid(userResult.ErrorMessage);
	//					}
	//					return StatusCode((int)userResult.HttpErrorCode, userResult.ErrorMessage);
	//				}
	//				//create claims details based on the user information
	//				var claims = new[] {
	//						new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
	//						new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
	//						new Claim("User", JsonSerializer.Serialize(userResult.Value))
	//				};

	//				var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
	//				var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
	//				var token = new JwtSecurityToken(
	//					_configuration["JwtSettings:Issuer"],
	//					_configuration["JwtSettings:Audience"],
	//					claims,
	//					expires: DateTime.UtcNow.AddMinutes(60),
	//				signingCredentials: signIn);

	//				return Ok(new JwtSecurityTokenHandler().WriteToken(token));
	//			}


	//			[AllowAnonymous]
	//			[HttpPut]
	//			[Route("users/logout")]
	//			public async Task<ActionResult> Logout([FromHeader(Name = "userid")] int userId)
	//			{
	//				return Ok();
	//			}

	//			[HttpPatch]
	//			[Route("users/change-password")]
	//			public async Task<ActionResult> ChangePassword([FromBody] UserChangePasswordDTO userChangePasswordDTO)
	//			{
	//				var changePasswordResult = await _loginService.ChangePassword(userChangePasswordDTO.Email,
	//								   userChangePasswordDTO.OldPassword, userChangePasswordDTO.NewPassword);
	//				if (!changePasswordResult.Success)
	//				{
	//					return StatusCode((int)changePasswordResult.HttpErrorCode!, changePasswordResult.ErrorMessage);
	//				}
	//				return Ok();
	//			}

	//			[AllowAnonymous]
	//			[HttpPost]
	//			[Route("users/register")]
	//			public async Task<ActionResult<User>> Register([FromBody] UserRegistrationDTO user)
	//			{
	//				var userResult = await _loginService.Register(user);
	//				if (!userResult.Success)
	//				{
	//					return StatusCode((int)userResult.HttpErrorCode!, userResult.ErrorMessage);
	//				}

	//				await _emailService.SendRegistrationConfirmationMail(userResult.Value.Email, user.HostUri);
	//				return Ok(userResult.Value);
	//			}

	//			[AllowAnonymous]
	//			[HttpPut]
	//			[Route("users/activate")]
	//			public async Task<ActionResult> Activate([FromBody] UserActivationRequest request)
	//			{
	//				var activationResult = await _loginService.ActivateUser(request.Token, request.HostUri);

	//				if (!activationResult.Success)
	//				{
	//					return StatusCode((int)activationResult.HttpErrorCode!, activationResult.ErrorMessage);
	//				}

	//				return Ok("User successfully activated.");
	//			}

	//			[HttpPost]
	//			[Route("users/auth/validate")]
	//			public ActionResult TestAuth()
	//			{
	//				return Ok("You are authorized");
	//			}

	//			[AllowAnonymous]
	//			[HttpPost]
	//			[Route("reset/{email}")]
	//			public async Task<ResetPasswordRequests?> AddNewResetPasswordRequest(string email)
	//			{
	//				var newRequest = await _resetPasswordRequestsService.AddNewRequest(email);
	//				return newRequest;
	//			}

	//			[AllowAnonymous]
	//			[HttpPatch]
	//			[Route("reset-password")]
	//			public async Task<ActionResult> VerifyRequestAndChangePass([FromBody] ResetPasswordDTO resetPass)
	//			{
	//				var request = await _resetPasswordRequestsService.GetRequest(resetPass.Token);
	//				var user = await _resetPasswordRequestsService.ResetPassword(request, resetPass.Password);

	//				if (user == null || request == null)
	//					return BadRequest();

	//				return Ok();
	//			}

	//			[AllowAnonymous]
	//			[HttpPost]
	//			[Route("users/reset")]
	//			public async Task ResetPasswordMail([FromBody] ResetPasswordRequestDTO resetPasswordRequest)
	//			{
	//				await _emailService.SendForgottenPasswordRequest(resetPasswordRequest.Email, resetPasswordRequest.Token, resetPasswordRequest.HostUri);
	//			}
	//		}
	//	//}
	//}
}