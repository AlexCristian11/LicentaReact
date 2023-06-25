using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicentaReact.Models
{
	public class Product
	{
		[Key]
		public int Id { get; set; }

		public string Nume { get; set; } = null!;

		public string Descriere { get; set; } = null!;

		[Column(TypeName = "decimal(6, 2)")]
		public decimal Pret { get; set; }

		public int Stoc { get; set; } 
		public string Imagine { get; set; } = null!;

		public int CategoryId { get; set; }
		public Category Category { get; set; } = null!;
	}
}
