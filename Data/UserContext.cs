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
	}
}
