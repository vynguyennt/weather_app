import React, {useState, useEffect} from 'react'
import WeatherWidget from '../common/WeatherWidget'
import './FavoriteScreen.css'

function FavoriteScreen(props) {
  let [locations, setLocations] = useState([])

  useEffect(() => {
    props.resetBackground()
    let favoriteLocations = JSON.parse(window.localStorage.getItem('favoriteLocations')) || []
    if (favoriteLocations.length) {
      Promise.all(
        favoriteLocations.map(loc => 
          fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=dd7b078955b9a8f743b67fdd8db9a012&units=metric`)
          .then(res => res.json())
          .then(data => {
            data = {...data, name: loc.name, coord: {lat: loc.lat, lon: loc.lon}}
            return data
          })
        )
      )
      .then(data => {
        setLocations(data)
      }).catch(error => console.log(error))
    }
  }, [])

  return (
    <div className="screen favorite-screen">
      <div className="widgets-list">
        {
          locations.map(location => <WeatherWidget data={location} key={location.id} />) 
        }
      </div>
    </div>
  )
}

export default FavoriteScreen