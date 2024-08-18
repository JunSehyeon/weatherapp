import React from 'react'

const WeatherBox = ({weather}) => {
    const convertToFahrenheit = (celsius) => ((celsius * 9/5) + 32).toFixed(1);
  return (
    <div className='weather-box'>
      <div className='weather-content'>
      <div>{weather?.name}</div>
      <div>{weather?.main.temp}°C/{convertToFahrenheit(weather?.main.temp)}°F</div>
      <div>{weather?.weather[0].description}</div>
      </div>
    </div>
  )
}

export default WeatherBox
