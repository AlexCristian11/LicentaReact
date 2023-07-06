using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace LicentaReact.Helpers
{
	public class JwtService
	{
		private string secureKey = "licenta react secure key test for 256";
		public string Generate(int id)
		{
			var symmetricSecuriyKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
			var credentials = new SigningCredentials(symmetricSecuriyKey, SecurityAlgorithms.HmacSha256Signature);
			var header = new JwtHeader(credentials);

			var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.UtcNow.AddDays(1)); // expiration date 1 day
			var securityToken = new JwtSecurityToken(header, payload);

			return new JwtSecurityTokenHandler().WriteToken(securityToken);
		}

		public JwtSecurityToken Verify(string jwt)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(secureKey);
			tokenHandler.ValidateToken(jwt, new TokenValidationParameters
			{
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateIssuerSigningKey = true,
				ValidateIssuer = false,
				ValidateAudience = false,
			}, out SecurityToken validatedToken);

			return (JwtSecurityToken)validatedToken;
		}
	}
}
