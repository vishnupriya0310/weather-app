const apiKey = "045baac3cb6c0c7a154d8086f546873a"; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) return alert("Please enter a city");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        document.getElementById("weather-result").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById("weather-result").innerHTML = `<p>${error.message}</p>`;
    }
}
