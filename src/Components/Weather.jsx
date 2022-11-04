import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Clouds from "/src/assets/icons/clouds.png";
import Humidity from "/src/assets/icons/humidity.png";
import Pressure from "/src/assets/icons/pressure.png"
import PlaceHolder from "/src/assets/icons/placeholder.png";
import Wind from "/src/assets/icons/wind.png";
import useApi from '../Hooks/useApi';
import Loading from './Loading';

const Weather = () => {
  const {weatherApi, isLoading} = useApi();
  const [changeDegrees, setChangeDegrees] = useState(true);

  const celciusDegree = Math.round(weatherApi.main?.temp-273.15);
  const farenheitDegree = Math.round(weatherApi.main?.temp-273.15) * 9/5 + 32;

  const clickToChangeDegree = () => {
    setChangeDegrees(!changeDegrees)
  };

  return (
    <>
      {isLoading ? (
        <Loading/>
        /* {useLoading} */
      ):(
        <div className='general_container'>
          <div className='header_weather'>
            <h1>Wheather App</h1>
            <h2><img src={PlaceHolder} alt="placeholderIcon" /> {weatherApi.name}, {weatherApi.sys?.country}</h2>
          </div>
          <div className="container_columns">
            <div className='first_column'>
              <img src={`http://openweathermap.org/img/wn/${weatherApi.weather?.[0].icon}@2x.png`} alt="imageWeather" />
              <h3>{`${changeDegrees ? celciusDegree : farenheitDegree} ${changeDegrees ? "°C" : "°F"}`}</h3>
            </div>
            <div className='second_column'>
              <h3>{weatherApi.weather?.[0].main}</h3>
              <div className="weatherCharacteristics">
                <h3><img src={Wind} alt="windIcon" /> Wind Speed: {weatherApi.wind?.speed} m/s</h3>
                <h3><img src={Clouds} alt="cloudsIcon" /> Clouds: {weatherApi.clouds?.all}%</h3>
                <h3><img src={Pressure} alt="pressureIcon" /> Pressure: {weatherApi.main?.pressure} mb</h3>
                <h3><img src={Humidity} alt="humidityIcon" /> Humidity: {weatherApi.main?.humidity} mb</h3>
              </div>
            </div>
          </div>
          <div className="footer">
            <button onClick={clickToChangeDegree}>Change degrees °C / °F</button>
            <h5>— Made with ❤️ by: Jamir Bances —</h5>
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;