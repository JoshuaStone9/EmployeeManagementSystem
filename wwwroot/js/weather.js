async function getWeather() {
	const city = document.getElementById('cityInput').value;
	if (!city) {
		alert('Please enter a city name');
		return;
	}

	try {
		const response = await fetch(`/api/weatherapi?city=${encodeURIComponent(city)}`);
		const resultDiv = document.getElementById('weatherResult');

		if (!response.ok) {
			const error = await response.text();
			resultDiv.innerHTML = `<div class="alert alert-danger">Error ${response.status}: ${error}</div>`;
			return;
		}

		const data = await response.json();
		resultDiv.innerHTML = `
			<div class="card bg-light">
				<div class="card-body">
					<h4>${data.city}</h4>
					<p class="mb-1"><strong>Temperature:</strong> ${data.temperature}°C</p>
					<p class="mb-1"><strong>Description:</strong> ${data.description}</p>
					<p class="mb-1"><strong>Humidity:</strong> ${data.humidity}%</p>
					<p class="mb-0"><strong>Wind Speed:</strong> ${data.windSpeed} m/s</p>
				</div>
			</div>
		`;
	} catch (error) {
		document.getElementById('weatherResult').innerHTML = 
			`<div class="alert alert-danger">Error: ${error.message}</div>`;
	}
}
