import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import { VictoryChart, VictoryLine, VictoryContainer, VictoryAxis } from 'victory'
import { makeItRain, makeItSnow, makeItClear, capitalizeText } from '../common/Utils'
import './WeatherScreen.css'

function WeatherScreen(props) {
  let { name, lat, lon } = useParams()
  let [noResult, setNoResult] = useState(false)
  let [location, setLocation] = useState({
    lat: 0,
    lon: 0,
    timezone: '',
    timezone_offset: 0,
    current: {
      dt: 0,
      sunrise: 0,
      sunset: 0,
      temp: 0,
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      dew_point: 0,
      uvi: 0,
      clouds: 0,
      visibility: 0,
      wind_speed: 0,
      wind_deg: 0,
      weather: [
        {
          id: 0,
          main: "",
          description: "",
          icon: ""
        }
      ]
    },
    hourly: [],
    daily: []
  })
  let [isScrollable, setIsScrollable] = useState(true)
  let [isFavorite, setIsFavorite] = useState(checkIsFavorite)
  const screenEl = useRef(null) 

  useEffect(() => {
    setIsFavorite(checkIsFavorite())
    makeItClear()
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=dd7b078955b9a8f743b67fdd8db9a012&units=metric`)
      .then(res => res.json())
      .then(data => {
        if (data.cod) {
          setNoResult(true)
        } else {
          setNoResult(false)
          data.hourly = data.hourly.filter((e, i, a) => (i % 2 === 0)).slice(0, 7)
          data.timezone = 'UTC' + ((data.timezone_offset/3600) >= 0 ? '+' : '') + Math.floor(data.timezone_offset/3600)
          setLocation(data)
          if (data.current.rain) makeItRain()
          if (data.current.snow) makeItSnow()

          let [currentTime, sunrise, sunset] = ['dt', 'sunrise', 'sunset'].map(time => 
            DateTime.fromJSDate(new Date(data.current[time] * 1000)).setZone(data.timezone).hour)
          props.setTimeAndRain(currentTime, sunrise, sunset, !!(data.current.rain))
        }
        if(screenEl.current.clientHeight <= window.innerHeight) {
          setIsScrollable(false)
        }
      })
      .catch(error => console.log(error))
  }, [props.searchValue, lat, lon])

  function checkIsFavorite() {
    let favoriteLocations = JSON.parse(window.localStorage.getItem('favoriteLocations')) || []
    for(let loc of favoriteLocations) {
      if (loc.lat == lat && loc.lon == lon) {
        return true
      }
    }
    return false
  }

  function updateFavorite(event) {
    event.preventDefault()
    let favoriteLocations = JSON.parse(window.localStorage.getItem('favoriteLocations')) || []
    if (!isFavorite) {
      favoriteLocations.push({name, lat, lon})
      window.localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations))
      setIsFavorite(true)
    } else {
      let removePosition = -1
      for (let i = 0; i < favoriteLocations.length; i++) {
        if (favoriteLocations[i].lat == lat && favoriteLocations[i].lon == lon) {
          removePosition = i
          break
        }
      }
      if (removePosition >= 0) {
        favoriteLocations.splice(removePosition, 1)
        window.localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations))
      }
      setIsFavorite(false)
    }
  }

  function toggleMoreDetails() {
    document.getElementsByClassName('show-more-btn')[0].classList.toggle('show-more')
    document.getElementsByClassName('weather-summary')[0].classList.toggle('show-more')
    document.getElementsByClassName('weather-details')[0].classList.toggle('show-more')
  }

  return noResult ?
    (
      <div className="screen">
        <h2>No data found</h2>
      </div>
    ) : (
      <div className="screen weather-screen" ref={screenEl}>
        <section className="weather-summary back-row-toggle splat-toggle">
          <div className="rain front-row" id="front-row"></div>
          <div className="rain back-row" id="back-row"></div>
          <div className="snowflakes"></div>

          <h1>{name.toUpperCase()}</h1>
          <h3>{DateTime.fromJSDate(new Date(location.current.dt * 1000)).setZone(location.timezone).toFormat('cccc, HH:mm')}</h3>
          <div className="temp-range">
            <h1>{location.daily[0] ? Math.round(location.daily[0].temp.min) : Math.round(location.current.temp)}&deg;</h1>
            <p>Low</p>
          </div>
          <div className="current-temp">{Math.round(location.current.temp)}&deg;C</div>
          <div className="temp-range">
            <h1>{location.daily[0] ? Math.round(location.daily[0].temp.max) : Math.round(location.current.temp)}&deg;</h1>
            <p>High</p>
          </div>
          <h3 className="weather-status">
            {capitalizeText(location.current.weather[0].description)}
          </h3>
        </section>
        <section className={'weather-details ' + (isScrollable ? '' : 'show-all')}>
          {
            [
              'M0, 50 C150, 120 350,  0 500, 70 L500, 250 L0, 250 Z',
              'M0, 30 C300, 0 400,   200 500, 20 L500, 250 L0, 250 Z',
              'M0, 50 C150, 200 350,  0 500, 50 L500, 250 L0, 250 Z'
            ].map((path, index) => (
              <div className="wavy-border-container" key={index}>
                <svg className="wavy-border" viewBox="0 0 500 150"
                  preserveAspectRatio="xMinYMin meet"
                  style={{zIndex: -1}}>
                  <path d={path} 
                  style={{stroke: 'none', fill: 'rgba(255, 255, 255, 0.5)'}}></path>
                </svg>
              </div>
            ))
          }

          {/* <div className={'show-more-btn ' + (isScrollable ? '' : 'hidden')} onClick={toggleMoreDetails}></div> */}
          <div className="show-more-btn hidden" onClick={toggleMoreDetails}></div>
          <button type="button" className="icon-btn save-location-btn" onClick={updateFavorite}>
            {isFavorite ? (
              <i className="material-icons">favorite</i>
            ) : (
              <i className="material-icons">favorite_border</i>
            )}
          </button>

          <section className="weather-current">
            <div className="weather-stat"><span>Humidity:</span> {location.current.humidity || 0} %</div>
            <div className="weather-stat"><span>Pressure:</span> {location.current.pressure || 0} hPa</div>
            <div className="weather-stat"><span>Wind:</span> {location.current.wind_speed || 0} m/s</div>
            <div className="weather-stat"><span>Cloud:</span> {location.current.clouds || 0} %</div>
            <div className="weather-stat"><span>Rain:</span> {location.current.rain ? location.current.rain['1h'] : 0} mm</div>
            <div className="weather-stat"><span>Snow:</span> {location.current.snow ? location.current.snow['1h'] : 0} mm</div>
          </section>

          {location.hourly.length &&
            <section className="hourly-forecast">
              <h3 className="section_label">Forecast</h3>
              <VictoryChart
                domainPadding={{ y: 10 }}
                padding={{ top: 40, right: 20, bottom: 40, left: 20 }}
                containerComponent={
                  <VictoryContainer style={{
                    pointerEvents: "auto",
                    userSelect: "auto",
                    touchAction: "auto"
                  }} />
                }
                height={150}
              >
                <VictoryAxis />
                <VictoryLine
                  style={{
                    data: { stroke: "#c43a31" }
                  }}
                  interpolation="natural"
                  data={
                    location.hourly.map(hour => {
                      let time = DateTime.fromJSDate(new Date(hour.dt * 1000)).setZone(location.timezone).hour
                      return ({
                        x: time > 12 ? `${time - 12}pm` : `${time}am`,
                        y: Math.round(hour.temp)
                      })
                    })
                  }
                  labels={({ datum }) => datum.y + '\xB0'}
                />
              </VictoryChart>
            </section>
          }

          {location.daily.length &&
            <section className="daily-forecast">
              <h3 className="section_label">This week</h3>
              <div className="scroll-container">
                <ul className="daily-forecast__list">
                  {location.daily.map(day => (
                    <li className="daily-forecast__item" key={day.dt}>
                      <p>{DateTime.fromJSDate(new Date(day.dt * 1000)).setZone(location.timezone).weekdayShort}</p>
                      <img src={"https://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png"} alt="" className="weather-icon daily-forecast__icon" />
                      <p>{Math.round(day.temp.min)}&deg; - {Math.round(day.temp.max)}&deg;</p>
                    </li>
                  ))}
                </ul>
              </div>

            </section>
          }
        </section>
      </div>
    )
}

export default WeatherScreen