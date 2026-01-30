using Microsoft.AspNetCore.Mvc;
using EmployeeManagementSystem.Models;
using System.Text.Json;

namespace EmployeeManagementSystem.Controllers.Api
{
	[ApiController]
	[Route("api/[controller]")]
	public class WeatherApiController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly HttpClient _httpClient;

		public WeatherApiController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
		{
			_configuration = configuration;
			_httpClient = httpClientFactory.CreateClient();
		}

		// GET: api/weatherapi?city=London
		[HttpGet]
		public async Task<ActionResult<WeatherData>> GetWeather([FromQuery] string city)
		{
			if (string.IsNullOrWhiteSpace(city))
				return BadRequest("City parameter is required");

			var apiKey = _configuration["WeatherApiKey"];
			if (string.IsNullOrEmpty(apiKey))
				return StatusCode(500, "Weather API key not configured");

			try
			{
				// Using Weatherstack API
				var url = $"http://api.weatherstack.com/current?access_key={apiKey}&query={city}";
				var response = await _httpClient.GetAsync(url);

				if (!response.IsSuccessStatusCode)
				{
					return StatusCode((int)response.StatusCode, "Failed to fetch weather data");
				}

				var content = await response.Content.ReadAsStringAsync();
				var jsonDoc = JsonDocument.Parse(content);
				var root = jsonDoc.RootElement;

				// Check for API errors in response
				if (root.TryGetProperty("error", out var error))
				{
					var errorInfo = error.GetProperty("info").GetString();
					return BadRequest($"API Error: {errorInfo}");
				}

				var location = root.GetProperty("location");
				var current = root.GetProperty("current");

				var weatherData = new WeatherData
				{
					City = location.GetProperty("name").GetString(),
					Temperature = current.GetProperty("temperature").GetDouble(),
					Description = current.GetProperty("weather_descriptions")[0].GetString(),
					Humidity = current.GetProperty("humidity").GetDouble(),
					WindSpeed = current.GetProperty("wind_speed").GetDouble()
				};

				return Ok(weatherData);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error: {ex.Message}");
			}
		}

			// GET: api/weatherapi/forecast?city=London
			[HttpGet("forecast")]
			public async Task<ActionResult> GetForecast([FromQuery] string city)
			{
				if (string.IsNullOrWhiteSpace(city))
					return BadRequest("City parameter is required");
		
				return Ok("Forecast functionality not yet implemented");
			}
		}
}