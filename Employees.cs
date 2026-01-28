using System.ComponentModel.DataAnnotations;

namespace Employees.Models
{
    public class Employee
    {
        
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Title { get; set; }
        public string Email { get; set; }

    }
}