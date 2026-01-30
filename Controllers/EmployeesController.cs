using Microsoft.AspNetCore.Mvc;
using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;
using System.Security.Principal;

namespace EmployeeManagementSystem.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var employees = EmployeeRepository.GetAll(_context);
            return View(employees);
        }

        public IActionResult Details(int id)
        {
            var employee = EmployeeRepository.GetById(_context, id);
            if (employee == null)
                return NotFound();
            return View(employee);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Employee employee)
        {
            if (!ModelState.IsValid)
                return View(employee);

            EmployeeRepository.Add(_context, employee);
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Edit(int id)
        {
            var employee = EmployeeRepository.GetById(_context, id);
            if (employee == null)
                return NotFound();
            return View(employee);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Employee employee)
        {
            if (!ModelState.IsValid)
                return View(employee);

            var updated = EmployeeRepository.Update(_context, employee);
            if (!updated)
                return NotFound();

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Delete(int id)
        {
            var employee = EmployeeRepository.GetById(_context, id);
            if(employee == null)
                return NotFound();
            return View(employee);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var deleted = EmployeeRepository.Delete(_context, id);
            if (!deleted)
                return NotFound();

            return RedirectToAction(nameof(Index));
        }
        public IActionResult Search(string lastname)
        {
            var results = EmployeeRepository.SearchByLastName(_context, lastname);
            return View("Index", results);
        }
}
}