using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicentaReact.Models
{
	public class CartItem
	{
		[Key]
		public int CartItemId { get; set; }

		[ForeignKey("Cart")]
		public int CartId { get; set; }
		public Cart Cart { get; set; }

		public int ProductId { get; set; }
		public Product Product { get; set; }

		public int Quantity { get; set; }
	}
}
