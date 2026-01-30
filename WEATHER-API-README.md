# Weather API Setup

## Overview
The WeatherApiController integrates with **Weatherstack API** to fetch real-time weather data.

## Setup Steps

### 1. Get an API Key
1. Go to [https://weatherstack.com](https://weatherstack.com)
2. Sign up for a free account
3. Navigate to **Dashboard** to find your API Access Key
4. Copy your API key

### 2. Configure the API Key

Create a `.env` file in the project root:

```bash
WeatherApiKey=your_actual_api_key_here
```

**Important:** The `.env` file is ignored by Git to keep your API key secure.

### 3. Test the API

#### Option 1: Web Interface
1. Run the application: `dotnet run`
2. Open browser to: `http://localhost:5299/weather-test.html`
3. Enter a city name (e.g., "London", "New York")
4. Click "Get Weather"

#### Option 2: Direct API Call
```
GET http://localhost:5299/api/weatherapi?city=London
```

#### Option 3: PowerShell
```powershell
Invoke-RestMethod -Uri "http://localhost:5299/api/weatherapi?city=London"
```

## API Response Format

```json
{
  "city": "London",
  "temperature": 15.5,
  "description": "partly cloudy",
  "humidity": 72,
  "windSpeed": 15
}
```

## API Endpoint

- **URL**: `/api/weatherapi`
- **Method**: GET
- **Parameters**: 
  - `city` (required) - Name of the city
- **Response**: WeatherData object with temperature in Celsius

## Error Handling

- **400 Bad Request**: City parameter missing or invalid city name
- **500 Internal Server Error**: API key not configured or API call failed
- **401 Unauthorized**: Invalid or missing API key from Weatherstack

## Security Note

The API key is stored in a `.env` file which is **not** committed to version control. Other developers should copy `.env.example` to `.env` and add their own API key.
