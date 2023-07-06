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
using System.Security.Claims;

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
		public async Task<ActionResult<IEnumerable<Models.Category>>> GetCategories()
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


		[HttpGet("get-cart")]
		public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
		{
			var carts = await _context.Carts.ToListAsync();
			return carts;
		}

		[HttpPost("add-product")]
		public IActionResult AddProduct(ProductDto dto)
		{
			var product = new Product
			{
				Nume = dto.Nume,
				Descriere = dto.Descriere,
				Pret = dto.Pret,
				Stoc = dto.Stoc,
				Imagine = dto.Imagine,
				CategoryId = dto.CategoryId,
			};

			_context.Products.Add(product);
			_context.SaveChanges();

			return Ok("success");
		}

		[HttpDelete("remove-product/{productId}")]
		public IActionResult DeleteProduct(int productId)
		{
			try
			{
				var product = _context.Products.Find(productId);

				if (product == null)
				{
					return NotFound(); 
				}

				_context.Products.Remove(product);
				_context.SaveChanges();

				return Ok(); 
			}
			catch (Exception)
			{
				return StatusCode(500, "Internal server error");
			}
		}

		[HttpPost("add-category")]
		public IActionResult AddCategory(CategoryDto dto)
		{
			var category = new Category { Nume = dto.Nume, };

			_context.Categories.Add(category);
			_context.SaveChanges();

			return Ok();
		}

		[HttpDelete("remove-category/{categoryId}")]
		public IActionResult DeleteCategory(int categoryId)
		{
			try
			{
				var category = _context.Categories.Find(categoryId);

				if (category == null)
				{
					return NotFound();
				}

				_context.Categories.Remove(category);
				_context.SaveChanges();

				return Ok();
			}
			catch (Exception)
			{
				return StatusCode(500, "Internal server error");
			}
		}

	}
}
