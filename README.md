# Employee Management System

A professional ASP.NET Core web application for managing employee data with a modern dashboard interface. The system features full CRUD operations, real-time weather integration, SQL Server database persistence, and secure REST API endpoints with responsive Bootstrap-based UI.

---

## Table of Contents
- [Overview](#overview)
- [High Level Architecture](#high-level-architecture)
- [Data Model](#data-model)
- [Control Flow](#control-flow)
- [Database Design](#database-design)
- [User Interface](#user-interface)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Potential Improvements](#potential-improvements)
- [Personal Development](#personal-development)

---

## Overview

Employee Management System is a full-stack ASP.NET Core application designed to manage employee records with persistence, API access, and real-time weather integration. The dashboard provides a professional interface for viewing, searching, creating, updating, and deleting employee records, while the REST API enables programmatic access to all operations.

Visitors can browse employees, perform CRUD operations, search by ID or last name, and view current weather conditions based on their location via geolocation.

---

## High Level Architecture

The application is implemented as an ASP.NET Core MVC application with a RESTful API layer and SQL Server database backend.

The structure is divided conceptually into:

**Backend Layer**  
ASP.NET Core controllers, dependency injection, Entity Framework Core ORM, and business logic  

**API Layer**  
REST endpoints for employee management and weather data retrieval  

**Data Access Layer**  
Repository pattern with Entity Framework Core for database operations  

**Database Layer**  
SQL Server LocalDB with Employees table and automatic seeding  

**Frontend Layer**  
Bootstrap 5 responsive UI, professional CSS styling with gradients, and vanilla JavaScript for API interaction  

**External Integration**  
Weatherstack API for real-time weather data based on geolocation  

---

## Data Model

The application uses Entity Framework Core for data persistence and follows a code-first approach.

**Employee Entity**  
- `Id` (int) - Primary key, auto-incremented
- `FirstName` (string) - Employee first name
- `LastName` (string) - Employee last name
- `Title` (string) - Job title/position
- `Email` (string) - Email address

**Weather Data Model**  
- `Temperature` (decimal) - Current temperature in Celsius
- `Description` (string) - Weather condition description
- `City` (string) - Location name
- `Humidity` (int) - Humidity percentage
- `WindSpeed` (decimal) - Wind speed in m/s

**Database Context**  
AppDbContext manages the Employees DbSet and automatically creates the database with seed data on first run.

---

## Control Flow

**Page Load**  
Browser requests `/dashboard.html`, weather loads via geolocation automatically  

**User Interaction**  
Dashboard provides buttons and forms for employee operations  

**API Request**  
JavaScript sends HTTP requests (GET, POST, PUT, DELETE) to REST endpoints  

**Database Operation**  
Controllers use dependency-injected DbContext and repository methods to perform CRUD operations  

**Response Rendering**  
Results display as formatted tables, success/error alerts, or detailed employee cards  

**External API Call**  
Weather data fetches from Weatherstack API using coordinates or city name  

---

## Database Design

**Technology Stack**  
- SQL Server LocalDB for development
- Entity Framework Core 10.0.2 ORM
- Database initialized with `EnsureCreated()` on application startup

**Schema**  
Single Employees table with 5 columns: Id, FirstName, LastName, Title, Email

**Seed Data**  
Database automatically populates with sample employee (John Doe) on first initialization

**Connection String**  
Configured in `appsettings.json` pointing to LocalDB instance

**Future-Ready**  
Structured for EF Core migrations to support schema evolution

---

## User Interface

Browser-based professional dashboard featuring:
- Orange gradient header with branding and tagline
- Weather section with current conditions and geolocation
- Employee list with refresh functionality
- Search by ID or last name with side-by-side layout
- Add employee form with validation feedback
- Update employee form with ID and field editing
- Delete employee with confirmation dialog
- Responsive tables with hover effects
- Colored alerts for success/error messages
- Professional footer with copyright

Built with Bootstrap 5.3.0, custom CSS gradients, and Bootstrap Icons.

---

## How to Run

**Requirements**  
- .NET 10.0 SDK or later
- SQL Server LocalDB
- Modern web browser
- Weatherstack API key (free tier available)

**Setup**  

1. Clone the repository
```bash
git clone https://github.com/JoshuaStone9/EmployeeManagementSystem.git
cd EmployeeManagementSystem
```

2. Create a `.env` file in the project root with your Weatherstack API key
```
WEATHERSTACK_API_KEY=your_api_key_here
```

3. Restore NuGet packages
```bash
dotnet restore
```

4. Build the project
```bash
dotnet build
```

5. Run the application
```bash
dotnet run
```

6. Open your browser and navigate to
```
http://localhost:5299/dashboard.html
```

---

## API Endpoints

**Base URL:** `http://localhost:5299/api`

### Employee Endpoints

- **GET** `/employeesapi` - Retrieve all employees
- **GET** `/employeesapi/{id}` - Retrieve employee by ID
- **POST** `/employeesapi` - Create new employee
- **PUT** `/employeesapi/{id}` - Update existing employee
- **DELETE** `/employeesapi/{id}` - Delete employee
- **GET** `/employeesapi/search?lastname={name}` - Search employees by last name

### Weather Endpoints

- **GET** `/weatherapi?city={cityname}` - Get weather by city name
- **GET** `/weatherapi?city={latitude},{longitude}` - Get weather by coordinates

**Response Format:** JSON with appropriate HTTP status codes and error messages

---

## Potential Improvements

- Add employee role-based access control (RBAC)
- Implement advanced search with multiple field criteria
- Add employee photo/avatar support with file uploads
- Create departmental organization and filtering
- Add employee history/audit logs for changes
- Implement pagination for large employee lists
- Add export to CSV/Excel functionality
- Create admin dashboard with statistics and reports
- Add email notifications for employee updates
- Implement caching layer for frequently accessed data
- Add unit and integration tests
- Deploy to cloud (Azure App Service, AWS)

---

## Personal Development

This project reinforced and expanded skills in:

- Full-stack ASP.NET Core development with MVC and REST API patterns
- Entity Framework Core ORM and database design
- Dependency injection and service architecture in .NET
- RESTful API design with proper HTTP methods and status codes
- Secure environment variable management and API key handling
- Bootstrap responsive design and professional UI/UX patterns
- Vanilla JavaScript async/await patterns and DOM manipulation
- Integration with third-party APIs (Weatherstack)
- Git workflow and repository management
- Professional code organization and separation of concerns
- Creating user-friendly interfaces with proper error handling and validation
- SQL Server database creation and management
- Production-ready application structure and best practices

