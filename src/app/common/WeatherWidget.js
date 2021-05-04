import React from 'react'
import { Link } from "react-router-dom"
import './WeatherWidget.css';

function WeatherWidget(props) {
  function addFavorite (id, event) {
    event.preventDefault()
    console.log('Update favorite: ' + id)
  }
  return (
    <Link to={"/weather/" + props.data.id} className="weather-widget">
      <div className="weather-widget-weather-status">{props.data.weather[0].main}</div>
      <button type="button" className="icon-btn save-location-button" onClick={(e) => addFavorite(props.data.id, e)}>
        {props.data.favorited ? (
          <i className="material-icons">favorite</i>
        ) : (
          <i className="material-icons">favorite_border</i>
        )}
      </button>
      <div className="weather-widget-location">
        <h3 className="weather-widget-location-city">{props.data.name}</h3>
        <span className="weather-widget-location-country">{props.data.sys.country}</span>
      </div>
      <div className="weather-widget-temperature">{props.data.main.temp}</div>
    </Link>
  )
}

export default WeatherWidget