namespace LicentaReact.DTOs
{
	public class ProductDto
	{
		public string Nume { get; set; }

		public string Descriere { get; set; }

		public decimal Pret { get; set; }

		public int Stoc { get; set; }

		public string Imagine { get; set; }
		public int CategoryId { get; set; }
	}
}
