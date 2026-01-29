// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const apiBase = '/api/employeesapi';

async function getAllEmployees() {
	try {
		const response = await fetch(apiBase);
		if (!response.ok) {
			const text = await response.text();
			document.getElementById('allEmployeesResult').textContent = `Error ${response.status}: ${text}`;
			return;
		}
		const data = await response.json();
		document.getElementById('allEmployeesResult').textContent = JSON.stringify(data, null, 2);
	} catch (error) {
		document.getElementById('allEmployeesResult').textContent = 'Error: ' + error.message;
	}
}

async function getEmployeeById() {
	const id = document.getElementById('getEmployeeId').value;
	if (!id) {
		alert('Please enter an employee ID');
		return;
	}

	try {
		const response = await fetch(`${apiBase}/${id}`);
		if (!response.ok) {
			const text = await response.text();
			document.getElementById('getEmployeeResult').textContent = `Error ${response.status}: ${text}`;
			return;
		}
		const data = await response.json();
		document.getElementById('getEmployeeResult').textContent = JSON.stringify(data, null, 2);
	} catch (error) {
		document.getElementById('getEmployeeResult').textContent = 'Error: ' + error.message;
	}
}

async function createEmployee() {
	const employee = {
		firstName: document.getElementById('createFirstName').value,
		lastName: document.getElementById('createLastName').value,
		title: document.getElementById('createTitle').value,
		email: document.getElementById('createEmail').value
	};

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
			document.getElementById('createEmployeeResult').textContent = `Error ${response.status}: ${text}`;
			return;
		}

		const data = await response.json();
		document.getElementById('createEmployeeResult').textContent = JSON.stringify(data, null, 2);

		// Clear form
		document.getElementById('createFirstName').value = '';
		document.getElementById('createLastName').value = '';
		document.getElementById('createTitle').value = '';
		document.getElementById('createEmail').value = '';
	} catch (error) {
		document.getElementById('createEmployeeResult').textContent = 'Error: ' + error.message;
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
		alert('Please enter an employee ID');
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
			document.getElementById('updateEmployeeResult').textContent = 'Employee updated successfully';
		} else {
			const error = await response.json();
			document.getElementById('updateEmployeeResult').textContent = JSON.stringify(error, null, 2);
		}
	} catch (error) {
		document.getElementById('updateEmployeeResult').textContent = 'Error: ' + error.message;
	}
}

async function deleteEmployee() {
	const id = document.getElementById('deleteEmployeeId').value;
	if (!id) {
		alert('Please enter an employee ID');
		return;
	}

	if (!confirm(`Are you sure you want to delete employee ${id}?`)) {
		return;
	}

	try {
		const response = await fetch(`${apiBase}/${id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			document.getElementById('deleteEmployeeResult').textContent = 'Employee deleted successfully';
		} else {
			const error = await response.json();
			document.getElementById('deleteEmployeeResult').textContent = JSON.stringify(error, null, 2);
		}
	} catch (error) {
		document.getElementById('deleteEmployeeResult').textContent = 'Error: ' + error.message;
	}
}

async function searchEmployees() {
	const lastname = document.getElementById('searchLastName').value;
	if (!lastname) {
		alert('Please enter a last name to search');
		return;
	}

	try {
		const response = await fetch(`${apiBase}/search?lastname=${encodeURIComponent(lastname)}`);
		if (!response.ok) {
			const text = await response.text();
			document.getElementById('searchEmployeesResult').textContent = `Error ${response.status}: ${text}`;
			return;
		}
		const data = await response.json();
		document.getElementById('searchEmployeesResult').textContent = JSON.stringify(data, null, 2);
	} catch (error) {
		document.getElementById('searchEmployeesResult').textContent = 'Error: ' + error.message;
	}
}
