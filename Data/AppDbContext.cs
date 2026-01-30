using Microsoft.EntityFrameworkCore;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		public DbSet<Employee> Employees { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Seed initial data
			modelBuilder.Entity<Employee>().HasData(
				new Employee { Id = 1, FirstName = "John", LastName = "Doe", Title = "Manager", Email = "john.doe@company.com" }
			);
		}
	}
}
