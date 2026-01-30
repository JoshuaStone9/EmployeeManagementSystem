// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const apiBase = '/api/employeesapi';

function formatEmployeesAsTable(employees) {
	if (!Array.isArray(employees) || employees.length === 0) {
		return '<div class="alert alert-info" role="alert">No employees found</div>';
	}

	let html = '<div class="table-responsive"><table class="table table-hover table-striped"><thead class="table-light"><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Job Title</th><th>Email</th></tr></thead><tbody>';
	
	employees.forEach(emp => {
		html += `<tr>
			<td><span class="badge bg-primary">${emp.id}</span></td>
			<td>${emp.firstName}</td>
			<td>${emp.lastName}</td>
			<td>${emp.title}</td>
			<td><a href="mailto:${emp.email}">${emp.email}</a></td>
		</tr>`;
	});
	
	html += '</tbody></table></div>';
	return html;
}

function formatSingleEmployee(emp) {
	return `
		<div class="card border-0 shadow-sm">
			<div class="card-header bg-light">
				<h5 class="mb-0">Employee Details</h5>
			</div>
			<div class="card-body">
				<div class="row mb-3">
					<div class="col-md-6">
						<p class="mb-1"><strong class="text-secondary">Employee ID:</strong></p>
						<p class="fs-5">${emp.id}</p>
					</div>
					<div class="col-md-6">
						<p class="mb-1"><strong class="text-secondary">Full Name:</strong></p>
						<p class="fs-5">${emp.firstName} ${emp.lastName}</p>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<p class="mb-1"><strong class="text-secondary">Job Title:</strong></p>
						<p class="fs-5">${emp.title}</p>
					</div>
					<div class="col-md-6">
						<p class="mb-1"><strong class="text-secondary">Email:</strong></p>
						<p class="fs-5"><a href="mailto:${emp.email}">${emp.email}</a></p>
					</div>
				</div>
			</div>
		</div>
	`;
}

async function getAllEmployees() {
	try {
		const response = await fetch(apiBase);
		if (!response.ok) {
			const text = await response.text();
			document.getElementById('allEmployeesResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error ${response.status}:</strong> ${text}</div>`;
			return;
		}
		const data = await response.json();
		document.getElementById('allEmployeesResult').innerHTML = formatEmployeesAsTable(data);
	} catch (error) {
		document.getElementById('allEmployeesResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${error.message}</div>`;
	}
}

async function getEmployeeById() {
	const id = document.getElementById('getEmployeeId').value;
	if (!id) {
		document.getElementById('getEmployeeResult').innerHTML = '<div class="alert alert-warning" role="alert">Please enter an employee ID</div>';
		return;
	}

	try {
		const response = await fetch(`${apiBase}/${id}`);
		if (!response.ok) {
			const text = await response.text();
			document.getElementById('getEmployeeResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error ${response.status}:</strong> ${text}</div>`;
			return;
		}
		const data = await response.json();
		document.getElementById('getEmployeeResult').innerHTML = formatSingleEmployee(data);
	} catch (error) {
		document.getElementById('getEmployeeResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${error.message}</div>`;
	}
}

async function createEmployee() {
	const employee = {
		firstName: document.getElementById('createFirstName').value,
		lastName: document.getElementById('createLastName').value,
		title: document.getElementById('createTitle').value,
		email: document.getElementById('createEmail').value
	};

	if (!employee.firstName || !employee.lastName || !employee.title || !employee.email) {
		document.getElementById('createEmployeeResult').innerHTML = '<div class="alert alert-warning" role="alert">Please fill in all fields</div>';
		return;
	}

	try {
		const response = await fetch(apiBase, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(employee)
		});

		if (!response.ok) {
			const text = await response.text();
			document.getElementById('createEmployeeResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error ${response.status}:</strong> ${text}</div>`;
			return;
		}

		const data = await response.json();
		document.getElementById('createEmployeeResult').innerHTML = `<div class="alert alert-success" role="alert"><strong>Success!</strong> Employee created successfully.</div>` + formatSingleEmployee(data);

		// Clear form
		document.getElementById('createFirstName').value = '';
		document.getElementById('createLastName').value = '';
		document.getElementById('createTitle').value = '';
		document.getElementById('createEmail').value = '';
	} catch (error) {
		document.getElementById('createEmployeeResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${error.message}</div>`;
	}
}

async function updateEmployee() {
	const employee = {
		id: parseInt(document.getElementById('updateId').value),
		firstName: document.getElementById('updateFirstName').value,
		lastName: document.getElementById('updateLastName').value,
		title: document.getElementById('updateTitle').value,
		email: document.getElementById('updateEmail').value
	};

	if (!employee.id) {
		document.getElementById('updateEmployeeResult').innerHTML = '<div class="alert alert-warning" role="alert">Please enter an employee ID</div>';
		return;
	}

	if (!employee.firstName || !employee.lastName || !employee.title || !employee.email) {
		document.getElementById('updateEmployeeResult').innerHTML = '<div class="alert alert-warning" role="alert">Please fill in all fields</div>';
		return;
	}

	try {
		const response = await fetch(`${apiBase}/${employee.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(employee)
		});

		if (response.ok) {
			document.getElementById('updateEmployeeResult').innerHTML = '<div class="alert alert-success" role="alert"><strong>Success!</strong> Employee updated successfully.</div>';
		} else {
			const error = await response.text();
			document.getElementById('updateEmployeeResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${error}</div>`;
		}
	} catch (error) {
		document.getElementById('updateEmployeeResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${error.message}</div>`;
	}
}

async function deleteEmployee() {
	const id = document.getElementById('deleteEmployeeId').value;
	if (!id) {
		document.getElementById('deleteEmployeeResult').innerHTML = '<div class="alert alert-warning" role="alert">Please enter an employee ID</div>';
		return;
	}

	if (!confirm(`Are you sure you want to delete employee ${id}? This action cannot be undone.`)) {
		return;
	}

	try {
		const response = await fetch(`${apiBase}/${id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			document.getElementById('deleteEmployeeResult').innerHTML = '<div class="alert alert-success" role="alert"><strong>Success!</strong> Employee deleted successfully.</div>';
			document.getElementById('deleteEmployeeId').value = '';
		} else {
			const error = await response.text();
			document.getElementById('deleteEmployeeResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${error}</div>`;
		}
	} catch (error) {
		document.getElementById('deleteEmployeeResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${error.message}</div>`;
	}
}

async function searchEmployees() {
	const lastname = document.getElementById('searchLastName').value;
	if (!lastname) {
		document.getElementById('searchEmployeesResult').innerHTML = '<div class="alert alert-warning" role="alert">Please enter a last name to search</div>';
		return;
	}

	try {
		const response = await fetch(`${apiBase}/search?lastname=${encodeURIComponent(lastname)}`);
		if (!response.ok) {
			const text = await response.text();
			document.getElementById('searchEmployeesResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error ${response.status}:</strong> ${text}</div>`;
			return;
		}
		const data = await response.json();
		document.getElementById('searchEmployeesResult').innerHTML = formatEmployeesAsTable(data);
	} catch (error) {
		document.getElementById('searchEmployeesResult').innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${error.message}</div>`;
	}
}
