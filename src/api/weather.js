const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeather = async (city = "Pune") => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${WEATHER_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error("Weather API error", await res.text());
    throw new Error("Failed to fetch weather data");
  }

  const data = await res.json();

  return {
    city: data.name,
    temperature: data.main.temp,
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
};
