import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { DateTime } from 'luxon'

import './WeatherWidget.css'

function WeatherWidget(props) {
  let [time, setTime] = useState('start')
  function removeFavorite (event, lat, lon) {
    event.preventDefault()
    let favoriteLocations = JSON.parse(window.localStorage.getItem('favoriteLocations')) || []
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
    window.location.reload()
  }

  useEffect(() => {
    let timezone = 'UTC' + ((props.data.timezone/3600) >= 0 ? '+' : '') + Math.floor(props.data.timezone/3600)
    let [sunrise, sunset] = ['sunrise', 'sunset'].map(t => 
      DateTime.fromJSDate(new Date(props.data.sys[t] * 1000)).setZone(timezone).hour)
      let time = DateTime.fromJSDate(new Date(props.data.dt * 1000)).setZone(timezone).hour
    if ((sunrise - time) === 1) {
      setTime('dawn')
    } else if (time === sunrise) {
      setTime('sunrise')
    } else if (time > sunrise && time <= 12) {
      setTime('morning')
    } else if (time > 12 && time < sunset) {
      setTime('afternoon')
    } else if (time === sunset) {
      setTime('sunset')
    } else if ((sunset - time) === 1) {
      setTime('dusk')
    } else {
      setTime('night')
    }
  }, [props.data])

  return (
    <Link to={`/weather/${props.data.name}/${props.data.coord.lat}/${props.data.coord.lon}`} className={'weather-widget bg-' + time}>
      <div className="weather-widget__status">
        <img src={"https://openweathermap.org/img/wn/" + props.data.weather[0].icon + "@2x.png"} alt="" className="weather-icon weather-status__icon" />
      </div>
      <button type="button" className="icon-btn save-location-btn weather-widget__btn" 
        onClick={(e) => removeFavorite(e, props.data.coord.lat, props.data.coord.lon)}>
        <i className="material-icons">favorite</i>
      </button>
      <div className="weather-widget__location">
        <h3 className="weather-widget__city">{props.data.name}</h3>
        <small className="weather-widget__country">{props.data.sys.country}</small>
      </div>
      <h1 className="weather-widget__temperature">{Math.round(props.data.main.temp || 0)}&deg;</h1>
      {
        [
          'M620, 0 C750, 150 550, 250 780, 460 L0, 460 L0, 0 Z',
          'M650, 0 C550, 200 800, 250 750, 420 L0, 460 L0, 0 Z',
          'M700, 0 C550, 210 800, 200 700, 420 L0, 460 L0, 0 Z'
        ].map((path, index) => (
          <div className="vertical-wavy-border-container" key={index}>
            <svg className="vertical-wavy-border" viewBox="0 0 800 450"
              preserveAspectRatio="xMinYMin meet"
              style={{zIndex: -1}}>
              <path d={path} 
              style={{stroke: 'none', fill: 'rgba(255, 255, 255, 0.5)'}}></path>
            </svg>
          </div>
        ))
      }
    </Link>
  )
}

export default WeatherWidget