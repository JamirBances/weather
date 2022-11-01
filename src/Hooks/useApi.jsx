import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherApi, setWeatherApi] = useState({});

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0630f8067a6cee1fa9f70fb86705bd92`)
        .then(res => {
          setIsLoading(false)
          setWeatherApi(res.data)
        });
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  console.log(weatherApi); 

  return {weatherApi, isLoading};
};

export default useApi;