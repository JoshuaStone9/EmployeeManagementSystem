# Employee Management API

## Base URL
```
https://localhost:5001/api/employeesapi
```

## Endpoints

### 1. Get All Employees
**GET** `/api/employeesapi`

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "title": "Software Engineer",
    "email": "john.doe@example.com"
  }
]
```

---

### 2. Get Employee by ID
**GET** `/api/employeesapi/{id}`

**Example:** `/api/employeesapi/1`

**Response:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "title": "Software Engineer",
  "email": "john.doe@example.com"
}
```

**Error (404):**
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404
}
```

---

### 3. Create Employee
**POST** `/api/employeesapi`

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "title": "Product Manager",
  "email": "jane.smith@example.com"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "firstName": "Jane",
  "lastName": "Smith",
  "title": "Product Manager",
  "email": "jane.smith@example.com"
}
```

**Validation Error (400):**
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "FirstName": ["The FirstName field is required."]
  }
}
```

---

### 4. Update Employee
**PUT** `/api/employeesapi/{id}`

**Example:** `/api/employeesapi/1`

**Request Body:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "title": "Senior Software Engineer",
  "email": "john.doe@example.com"
}
```

**Response (204 No Content)**

**Error - ID Mismatch (400):**
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Bad Request",
  "status": 400
}
```

---

### 5. Delete Employee
**DELETE** `/api/employeesapi/{id}`

**Example:** `/api/employeesapi/1`

**Response (204 No Content)**

**Error (404):**
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404
}
```

---

### 6. Search Employees
**GET** `/api/employeesapi/search?lastname={lastname}`

**Example:** `/api/employeesapi/search?lastname=Doe`

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "title": "Software Engineer",
    "email": "john.doe@example.com"
  }
]
```

---

## Testing the API

### Option 1: Web Interface
Navigate to: `https://localhost:5001/api-test.html`

### Option 2: VS Code REST Client
1. Install "REST Client" extension
2. Open `test-api.http`
3. Click "Send Request" above each request

### Option 3: PowerShell/curl
```powershell
# Get all employees
Invoke-RestMethod -Uri "https://localhost:5001/api/employeesapi" -Method Get

# Create employee
$body = @{
    firstName = "Test"
    lastName = "User"
    title = "Tester"
    email = "test@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://localhost:5001/api/employeesapi" -Method Post -Body $body -ContentType "application/json"
```

### Option 4: JavaScript Fetch
```javascript
// Get all employees
fetch('/api/employeesapi')
  .then(response => response.json())
  .then(data => console.log(data));

// Create employee
fetch('/api/employeesapi', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Test',
    lastName: 'User',
    title: 'Tester',
    email: 'test@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Validation Rules

### Employee Model
- **FirstName**: Required, Max 50 characters
- **LastName**: Required
- **Title**: Required
- **Email**: Valid email format
