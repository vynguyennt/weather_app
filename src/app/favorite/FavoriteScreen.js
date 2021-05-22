import React, {useState, useEffect} from 'react'
import WeatherWidget from '../common/WeatherWidget'
import { useAppId } from '../App'
import './FavoriteScreen.css'

function FavoriteScreen(props) {
  const appId = useAppId()
  let favoriteLocations = JSON.parse(window.localStorage.getItem('favoriteLocations')) || []
  let [locations, setLocations] = useState(favoriteLocations)

  useEffect(() => {
    let isCancelled = false
    props.resetBackground()
    if (favoriteLocations.length) {
      favoriteLocations.map(loc => 
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${appId}&units=metric`)
        .then(res => res.json())
        .then(data => {
          if (!isCancelled) {
            setLocations(prevState => {
              let list = prevState.concat()
              let index = list.findIndex(l => l.lat === loc.lat && l.lon === loc.lon)
              list[index] = {...data, ...list[index]}
              return list
            })
          }
        })
        .catch(error => console.log(error))
      )
    }

    return (() => {
      isCancelled = true
    })
  }, [])

  return (
    <div className="screen favorite-screen">
      <div className="widgets-list">
        {
          locations.length ?
          locations.map((location, index) => <WeatherWidget loading={!location.weather} data={location} key={location.id || index} />) 
          : (<span className="info-msg"><i>No locations saved</i></span>)
        }
      </div>
    </div>
  )
}

export default FavoriteScreen