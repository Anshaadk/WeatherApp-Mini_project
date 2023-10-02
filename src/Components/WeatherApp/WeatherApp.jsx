import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

function WeatherApp() {
  const api_key = import.meta.env.VITE_API_KEY;
  const [wicon, setWincon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState({
    humidity: '64%',
    windSpeed: '18 km/h',
    temperature: '24°C',
    location: 'London',
    description: 'wind',
  });
  const [placeNotFound, setPlaceNotFound] = useState(false);

  const search = async () => {
    const element = document.getElementsByClassName('cityInput')[0];
    if (element.value === '') {
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`
      );

      const data = response.data;

    
      const newWeatherData = {
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed} km/h`,
        temperature: `${Math.floor(data.main.temp)}°C`,
        location: data.name,
        description: data.weather[0].main,
      };

      setWeatherData(newWeatherData);
      setPlaceNotFound(false);

      // Update weather icon based on description
      setWeatherIcon(data.weather[0].icon);
    } catch (error) {
      toast.error('Place not found', { position: toast.POSITION.TOP_CENTER });
      console.error('Error fetching weather data:', error);
    }
  };

  const setWeatherIcon = (icon) => {
    if (icon === '01d' || icon === '01n') {
      setWincon(clear_icon);
    } else if (icon === '02d' || icon === '02n') {
      setWincon(cloud_icon);
    } else if (icon === '03d' || icon === '03n' || icon === '04d' || icon === '04n') {
      setWincon(drizzle_icon);
    } else if (icon === '09d' || icon === '09n' || icon === '10d' || icon === '10n') {
      setWincon(rain_icon);
    } else if (icon === '13d' || icon === '13n') {
      setWincon(snow_icon);
    } else {
      setWincon(clear_icon);
    }
  };

  return (
    < >
    <div >
    <div  className="container">
         <ToastContainer autoClose={3000} />
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
        <p className="discri">{weatherData.description}</p>
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} className="icon" alt="" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} className="icon" alt="" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default WeatherApp;
