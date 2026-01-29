using Microsoft.AspNetCore.Mvc;
using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesApiController : ControllerBase  // Note: ControllerBase, not Controller
    {
        // GET: api/employeesapi
        [HttpGet]
        public ActionResult<List<Employee>> GetAll()
        {
            return Ok(EmployeeRepository.GetAll());
        }

        // GET: api/employeesapi/5
        [HttpGet("{id}")]
        public ActionResult<Employee> GetById(int id)
        {
            var employee = EmployeeRepository.GetById(id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }

        // POST: api/employeesapi
        [HttpPost]
        public ActionResult<Employee> Create([FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            EmployeeRepository.Add(employee);
            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
        }

        // PUT: api/employeesapi/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Employee employee)
        {
            if (id != employee.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = EmployeeRepository.Update(employee);
            if (!updated)
                return NotFound();

            return NoContent();
        }

        // DELETE: api/employeesapi/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = EmployeeRepository.Delete(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }

        // GET: api/employeesapi/search?lastname=Doe
        [HttpGet("search")]
        public ActionResult<List<Employee>> Search([FromQuery] string lastname)
        {
            var results = EmployeeRepository.SearchByLastName(lastname);
            return Ok(results);
        }
    }
}