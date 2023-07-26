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
using System.Text.Json;
using System.Text.Json.Serialization;
using Azure;

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

		[HttpPost("cart-add")]
		public async Task<IActionResult> AddToCart(int userId, int productId, int quantity)
		{
			var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
			

			if (cart != null)
			{
				var existingCartItem = _context.CartItems.FirstOrDefault(ci => ci.CartId == cart.Id && ci.ProductId == productId);

				if (existingCartItem != null)
				{
					existingCartItem.Quantity += quantity;
				}
				else
				{

					var cartItem = new CartItem
					{
						CartId = cart.Id,
						ProductId = productId,
						Quantity = quantity
					};
					_context.CartItems.Add(cartItem);
					
				}
				_context.SaveChanges();
				return Ok(); 
			}
			else
			{
				return NotFound("Cart not found for the user.");
			}
		}

		[HttpGet("cart-items/{cartId}")]
		public IActionResult GetCartItemsByCartId(int cartId)
		{
			var cartItems = _context.CartItems
				.Where(ci => ci.CartId == cartId)
				.ToList();

			return Ok(cartItems);
		}

		[HttpGet("cart-items-products/{cartId}")]
		public IActionResult GetCartItemsProductsByCartId(int cartId)
		{
			var cartItems = _context.CartItems
				.Where(ci => ci.CartId == cartId)
				.Include(ci => ci.Product) 
				.ToList();

			return Ok(cartItems);
		}

		[HttpGet("cart/{userId}")]
		public async Task<ActionResult<Cart>> GetCartById(int userId)
		{
			var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);

			if (cart == null)
			{
				return NotFound();
			}

			return cart;
		}


		[HttpGet("get-cart")]
		public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
		{
			var carts = await _context.Carts.ToListAsync();
			return carts;
		}


		[HttpDelete("remove-cart-product/{cartItemId}")]
		public IActionResult RemoveFormCart(int cartItemId)
		{
			var cartItem = _context.CartItems.FirstOrDefault(c => c.CartItemId == cartItemId);

			if (cartItem != null ) 
			{ 
				_context.CartItems.Remove(cartItem);
				_context.SaveChanges();

				return Ok("Product removed");
			}
			else
			{
				return NotFound("Cart item not found");
			}
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

		[HttpGet("get-cart-items")]
		public IActionResult GetProductsCart (int cartId)
		{
			var cartItems = _context.CartItems.Where(ci => ci.CartId == cartId).ToList();
			var productIds = cartItems.Select(ci => ci.ProductId).ToList();

			List<int> items = new List<int>();

			foreach (var productId in productIds)
			{
				items.Add(productId);
			}

			return Ok(items);
		}

		[HttpPost("create-receipt")]
		public IActionResult CreateReceipt(int cartId)
		{
			try
			{
				var cart = _context.Carts.Include(c => c.CartItems).ThenInclude(ci => ci.Product).FirstOrDefault(c => c.Id == cartId);
				var cartItems = _context.CartItems.Where(ci => ci.CartId == cartId).ToList();
				var productIds = cartItems.Select(ci => ci.ProductId).ToList();

				decimal total = cartItems.Sum(ci => ci.Product.Pret * ci.Quantity);

				if (cart == null) 
				{
					return NotFound("Cart not found");
				}

				var userId = cart.UserId;
				var date = DateTime.Now;

				var receipt = new Receipt
				{
					CartId = cartId,
					UserId = userId,
					Date = date,
					CartItems = cart.CartItems.ToList(),
					Total = total
				};

				

				var options = new JsonSerializerOptions
				{
					ReferenceHandler = ReferenceHandler.Preserve
				};

				var json = JsonSerializer.Serialize(receipt, options);

				_context.Receipts.Add(receipt);
				_context.SaveChanges();

				cart.CartItems.Clear();
				_context.SaveChanges();

				return Ok(receipt);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error creating receipt: {ex.InnerException?.Message ?? ex.Message}");
			}
		}

		[HttpGet("receipts")]
		public IActionResult GetUserReceipts(int userId)
		{
			try
			{
				var receipts = _context.Receipts.Include(r => r.User)
												.Where(r => r.UserId == userId)
												.ToList();

				if (receipts.Count == 0)
				{
					return NotFound("No receipts found for the user");
				}

				return Ok(receipts);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error retrieving user receipts: {ex.Message}");
			}
		}

		[HttpPut("edit/{id}")]
		public IActionResult UpdateUser(int id, [FromBody] UpdateUserDto userDto)
		{
			
			var user = _context.Users.Find(id);

			if (user == null)
			{
				return NotFound("User not found");
			}

			
			user.Nume = userDto.Nume;
			user.Prenume = userDto.Prenume;
			user.Adresa = userDto.Adresa;
			user.Email = userDto.Email;

			
			_context.SaveChanges();

			return Ok("User updated successfully");
		}

	}
}
