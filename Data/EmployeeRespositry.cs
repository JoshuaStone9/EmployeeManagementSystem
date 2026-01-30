using EmployeeManagementSystem.Models;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeManagementSystem.Data
{
	public static class EmployeeRepository
	{
		public static List<Employee> GetAll(AppDbContext context) => context.Employees.ToList();

		public static Employee? GetById(AppDbContext context, int id) => context.Employees.FirstOrDefault(e => e.Id == id);

		public static void Add(AppDbContext context, Employee employee)
		{
			context.Employees.Add(employee);
			context.SaveChanges();
		}

		public static bool Update(AppDbContext context, Employee employee)
		{
			var existing = GetById(context, employee.Id);
			if (existing == null)
				return false;
			else
			{
				existing.FirstName = employee.FirstName;
				existing.LastName = employee.LastName;
				existing.Title = employee.Title;
				existing.Email = employee.Email;
				context.SaveChanges();
				return true;
			}
		}

		public static bool Delete(AppDbContext context, int id)
		{
			var employee = GetById(context, id);
			if (employee == null)
				return false;
			else
			{
				context.Employees.Remove(employee);
				context.SaveChanges();
				return true;
			}
		}

		public static List<Employee> SearchByLastName(AppDbContext context, string lastname)
		{
			return context.Employees
				.Where(e => e.LastName.ToLower().Contains(lastname.ToLower()))
				.ToList();
		}
	}
}