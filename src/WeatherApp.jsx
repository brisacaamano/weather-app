import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'API_KEY'
  const difKelvin = 273.5

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${baseUrl}?q=${city}&appid=${API_KEY}&lang=es`)
      const data = await response.json()
      console.log(data)
      setWeatherData(data)
    }
    catch (error) {
      console.error('An error has occurred: ', error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchWeatherData()
  }

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  return (
    <div className='container'>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter any city' value={city} onChange={handleChange}></input>
        <button type='submit'>Search</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>The current temperature is {Math.floor(weatherData.main.temp - difKelvin)}°C</p>
          <p>The current weather condition is {weatherData.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/>
        </div>
      )}
    </div>
  )
}
