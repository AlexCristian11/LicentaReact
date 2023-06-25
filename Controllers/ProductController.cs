using LicentaReact.Data;
using LicentaReact.DTOs;
using LicentaReact.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Buffers.Text;
using System.Collections;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Reflection.Metadata;
using System.Text.RegularExpressions;

namespace LicentaReact.Controllers
{
	[Route("api")]
	[ApiController]
	public class ProductController : Controller
	{
		private readonly UserContext _context;

		public ProductController(UserContext context)
		{
			_context = context;
		}


		[HttpGet("categories")]
		public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
		{
			var categories = await _context.Categories.ToListAsync();
			return categories;
		}

		[HttpGet("products")]
		public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
		{
			var products = await _context.Products.ToListAsync();
			return products;
		}

		[HttpGet("products/{id}")]
		public async Task<ActionResult<Product>> GetProductById(int id)
		{
			var product = await _context.Products.FindAsync(id);

			if (product == null)
			{
				return NotFound();
			}

			return product;
		}

	}
}
