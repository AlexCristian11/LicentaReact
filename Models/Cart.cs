using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LicentaReact.Models
{
	public class Cart
	{
		[Key]
		public int Id { get; set; }


		[ForeignKey("User")]
		public int UserId { get; set; }

		public User User { get; set; }

		public List<CartItem> CartItems { get; set; }
	}
}
