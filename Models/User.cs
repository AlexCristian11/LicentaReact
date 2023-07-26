using System.Text.Json.Serialization;

namespace LicentaReact.Models
{
	public class User
	{
		public int Id { get; set; }
		public string Nume { get; set; }

		public string Prenume { get; set; }

		public string Email { get; set; }

		public string Adresa { get; set; }
		
		[JsonIgnore]
		public string Parola { get; set; }

		public Cart Cart { get; set; }

		public User()
		{
			Cart = new Cart();
		}
	}
}
