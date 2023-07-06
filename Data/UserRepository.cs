using LicentaReact.Models;
using Microsoft.EntityFrameworkCore;

namespace LicentaReact.Data
{
	public class UserRepository : IUserRepository
	{
		private readonly UserContext _context;
		public UserRepository(UserContext context) 
		{
			_context = context;
		}
		public User Create(User user)
		{
			_context.Users.Add(user);
			user.Id = _context.SaveChanges();

			return user;
		}

		public User GetByEmail(string email)
		{
			return _context.Users.FirstOrDefault(u => u.Email == email);
		}
		
		public User GetById(int id)
		{
			return _context.Users.FirstOrDefault(u => u.Id == id);
		}

		public void DeleteUser(int userId)
		{
			var user = _context.Users.FirstOrDefault(u => u.Id == userId);

			if (user != null)
			{
				_context.Users.Remove(user);
				_context.SaveChanges();
			} else
			{
				throw new ArgumentException($"User with ID {userId} not found.");
			}
		}
	}
}
