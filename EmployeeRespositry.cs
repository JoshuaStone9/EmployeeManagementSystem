using Employees.Models;
using System.Collections.Generic;
using System.Linq;

namespace Employees.Data
{
    public static class EmployeeRepository
    {
        private static readonly new List<Employee> _employees = 
        [
           new Employee { Id = 1, FirstName = "John", LastName = "Doe", Title = "Software Engineer", Email = "john.doe@example.com"}
        ];

       

        public static List<Employee> GetAll() => _employees.ToList();

        public static Employee? GetById(int id) => _employees.FirstOrDefault(e => e.Id == id);

        public static void Add(Employee employee)
        {
            employee.Id = _employees.Max(e => e.Id) + 1;
            _employees.Add(employee);
        }

        public static bool Update(Employee employee)
        {
            var existing = GetById(employee.Id);
            if (existing == null)
                return false;
            else
            {
                existing.FirstName = employee.FirstName;
                existing.LastName = employee.LastName;
                existing.Title = employee.Title;
                existing.Email = employee.Email;
                return true;
            }
        }

        public static bool Delete(int id)
        {
            var employee = GetById(id);
            if (employee == null)
                return false;
            else
            {
                _employees.Remove(employee);
                return true;
            }

        }

        public static List<Employee> SearchByLastName(string lastname)
        {
            return _employees
            .Where(e => e.LastName.ToLower().Contains(lastname.ToLower()))
            .ToList();
        }
        
    }
}