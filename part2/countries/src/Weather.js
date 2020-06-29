import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OPENWEATHER_URL = "http://api.openweathermap.org/data/2.5/weather"

const Weather = ({ country }) => {

  const [ cityWeather, setCityWeather ] = useState({
    temperature: 0,
    humidity: 0,
    wind_speed: 0,
  })

  useEffect(() => {
    const url = `${ OPENWEATHER_URL }` +
                `?appid=${ process.env.REACT_APP_OPENWEATHER_KEY }` +
                `&q=${ country.capital }` +
                `&units=metric`
    console.log(url)
    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        setCityWeather({
          temperature: response.data.main.temp,
          wind_speed: response.data.wind.speed,
          humidity: response.data.main.humidity
        })
      })
  }, [country])

  return (
    <div>
      <h3>Weather in { country.capital }</h3>
      <b>temperature:</b> { cityWeather.temperature } celsius<br />
      <b>humidity:</b> { cityWeather.humidity } %<br />
      <b>wind:</b> { cityWeather.wind_speed } km/h
    </div>
  )
}

export default Weather