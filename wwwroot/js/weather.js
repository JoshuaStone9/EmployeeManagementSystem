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
			<div class="weather-card-temp card">
				<div class="card-body">
					<h2 class="card-title">${data.temperature}°C</h2>
					<p class="card-text">${data.description}</p>
					<h4>${data.city}</h4>
				</div>
			</div>
			<div class="weather-card-details card">
				<div class="card-body">
					<div class="weather-stat">
						<span class="badge bg-info">💧 Humidity</span>
						<h5>${data.humidity}%</h5>
					</div>
					<div class="weather-stat">
						<span class="badge bg-success">💨 Wind Speed</span>
						<h5>${data.windSpeed} m/s</h5>
					</div>
				</div>
			</div>
		`;
	} catch (error) {
		document.getElementById('weatherResult').innerHTML = 
			`<div class="alert alert-danger">Error: ${error.message}</div>`;
	}
}

async function getLocalWeather() {
    if (!navigator.geolocation) {
        alert('Geolocation not supported by your browser');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            const coords = `${latitude},${longitude}`;
            
            try {
                const response = await fetch(`/api/weatherapi?city=${encodeURIComponent(coords)}`);
                const resultDiv = document.getElementById('weatherResult');

                if (!response.ok) {
                    const error = await response.text();
                    resultDiv.innerHTML = `<div class="alert alert-danger">Error ${response.status}: ${error}</div>`;
                    return;
                }

                const data = await response.json();
                resultDiv.innerHTML = `
                    <div class="weather-card-temp card">
                        <div class="weather-card-body">
                            <h2 class="card-title">${data.temperature}°C</h2>
                            <p class="card-text">${data.description}</p>
                            <h4>${data.city}</h4>
                        </div>
                    </div>
                `;
            } catch (error) {
                document.getElementById('weatherResult').innerHTML = 
                    `<div class="alert alert-danger">Error: ${error.message}</div>`;
            }
        },
        (error) => {
            alert('Unable to access location: ' + error.message);
        }
    );
}
