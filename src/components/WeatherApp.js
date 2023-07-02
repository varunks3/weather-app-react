import React, { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const API_KEY = "8552e5029bec7efd5c5255eb43d1f17f"; //my api key from openweathermap

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );  // fetched weather details from open weather and stored in a variable response
      console.log(response)
      const data = await response.json(); // .json() to store the body of fetched response into json formate in data variable

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {  // catching error message if failed to fetch the data
      setWeatherData(null);
      setError(error.message);
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container">
      <h1 >Weather App</h1>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
          />
          <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2 className="city-name">{weatherData.name}</h2>
          <div className="weather-details">
            <div className="weather-condition">
              <img
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}  // adding weather icon from weather array in weatherData's object
                alt="Weather Icon"
                className="weather-icon"
              />
              <div className="temp">
                <p className="temperature"> {weatherData.main.temp}°C </p>
                <p className="type"> |{weatherData.weather[0].description}</p>  {/*displaying weather discription from weather array of weatherData object */}
               </div>
            </div>
            <div className="humidity">
              <p>Humidity: {weatherData.main.humidity}%</p> {/*displaying humidity and wind speed from weatherData object*/}
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default WeatherApp;
