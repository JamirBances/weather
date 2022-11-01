import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Weather = () => {
  const [weatherApi, setWeatherApi] = useState({});

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0630f8067a6cee1fa9f70fb86705bd92`)
        .then(res => setWeatherApi(res.data));
    }

    navigator.geolocation.getCurrentPosition(success);
  }, [])

  console.log(weatherApi);

  const [changeDegrees, setChangeDegrees] = useState(true);

  const clickToChangeDegree = () => {
    setChangeDegrees(!changeDegrees)
  };

  const celciusDegree = Math.round(weatherApi.main?.temp-273.15);
  const farenheitDegree = Math.round(weatherApi.main?.temp-273.15) * 9/5 + 32;

  return (
    <div className='general_container'>
      <div className='header_weather'>
        <h1>Wheather App</h1>
        <h2><img src="../src/assets/icons/placeholder.png" alt="placeholderIcon" /> {weatherApi.name}, {weatherApi.sys?.country}</h2>
      </div>
      <div className="container_columns">
        <div className='first_column'>
          <img src={`http://openweathermap.org/img/wn/${weatherApi.weather?.[0].icon}@2x.png`} alt="imageWeather" />
          <h3>{`${changeDegrees ? celciusDegree : farenheitDegree} ${changeDegrees ? "°C" : "°F"}`}</h3>
        </div>
        <div className='second_column'>
          <h3>{weatherApi.weather?.[0].main}</h3>
          <div className="weatherCharacteristics">
            <h3><img src="../src/assets/icons/wind.png" alt="windIcon" /> Wind Speed: {weatherApi.wind?.speed} m/s</h3>
            <h3><img src="../src/assets/icons/clouds.png" alt="cloudsIcon" /> Clouds: {weatherApi.clouds?.all}%</h3>
            <h3><img src="../src/assets/icons/pressure.png" alt="pressureIcon" /> Pressure: {weatherApi.main?.pressure} mb</h3>
            <h3><img src="../src/assets/icons/humidity.png" alt="humidityIcon" /> Humidity: {weatherApi.main?.humidity} mb</h3>
          </div>
        </div>
      </div>
      <div className="footer">
        <button onClick={clickToChangeDegree}>Change degrees °C / °F</button>
        <h5>Made with ❤️ by: Jamir Bances</h5>
      </div>
    </div>
  );
};

export default Weather;