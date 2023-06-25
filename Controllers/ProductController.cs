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

		[HttpGet("cart/{id}")]
		public IActionResult GetCart(int id)
		{
			var cart = _context.Carts.Include(c => c.Products).FirstOrDefault(c => c.Id == id);
			if (cart == null)
			{
				return NotFound("Cart not found");
			}

			var cartDto = new AddToCartDto
			{
				Id = cart.Id,
				Products = cart.Products.Select(p => new ProductDto
				{
					Id = p.Id,
					Nume = p.Nume,
					Pret = p.Pret,
					Imagine = p.Imagine,
				}).ToList()
			};
			return Ok(cartDto);
		}
		
		[HttpPost("cart")]
		public IActionResult AddToCart([FromBody] AddToCartDto addToCartDto)
		{
			// Retrieve the existing cart from the database or create a new cart
			var cart = _context.Carts.Include(c => c.Products).FirstOrDefault();

			if (cart == null)
			{
				cart = new Cart();
				cart.Products = new List<Product>();
				_context.Carts.Add(cart);
			}

			// Retrieve the products that need to be added to the cart
			var products = _context.Products.Where(p => addToCartDto.Products.Select(pd => pd.Id).Contains(p.Id)).ToList();

			if (products.Count != addToCartDto.Products.Count)
			{
				return NotFound("One or more products not found");
			}

			// Add the products to the cart
			foreach (var product in products)
			{
				cart.Products.Add(product);
			}

			// Save the changes to the database
			_context.SaveChanges();

			return CreatedAtAction(nameof(GetCart), new { id = cart.Id }, cart);
		}
	}
}
