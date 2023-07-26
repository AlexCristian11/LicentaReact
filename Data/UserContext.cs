using LicentaReact.Models;
using Microsoft.EntityFrameworkCore;

namespace LicentaReact.Data
{
	public class UserContext : DbContext
	{
		public UserContext(DbContextOptions<UserContext> options) : base(options) 
		{
			
		}	

		public DbSet<User> Users { get; set; }
	
		public DbSet<Product> Products { get; set; }

		public DbSet<Category> Categories { get; set; }

		public DbSet<Cart> Carts { get; set; }

		public DbSet<CartItem> CartItems { get; set; }

		public DbSet<Receipt> Receipts { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Receipt>()
				.HasOne(r => r.Cart)
				.WithMany()
				.HasForeignKey(r => r.CartId)
				.OnDelete(DeleteBehavior.Restrict);

			base.OnModelCreating(modelBuilder);
		}

	}
}
