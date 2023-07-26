using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicentaReact.Models
{
	public class Receipt
	{
		[Key]
		public int Id { get; set; }

		[ForeignKey("Cart")]
		public int CartId { get; set; }
		public Cart Cart { get; set; }

		[ForeignKey("User")]
		public int UserId { get; set; }
		public User User { get; set; }

		public DateTime Date { get; set; }

		[Column(TypeName = "decimal(8, 2)")]
		public decimal Total { get; set; }

		public List<CartItem> CartItems { get; set; }
	}
}
