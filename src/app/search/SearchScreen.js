import React, {useState, useEffect} from 'react'
import WeatherWidget from '../common/WeatherWidget'

function SearchScreen(props) {
  let [location, setLocation] = useState({})

  useEffect(() => {
    if (props.searchValue) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.searchValue}&appid=dd7b078955b9a8f743b67fdd8db9a012&units=metric`)
      .then(res => res.json())
      .then(data => {
        setLocation(data)
      })
      .catch(error => console.log(error))
    }
  }, [props.searchValue])

  return (props.searchValue && location.id) ? 
  (
    <div className="screen search-screen">
      <h2>Search Results for "{props.searchValue}"</h2>
      <div className="widgets-list">
        {
          location.id && <WeatherWidget data={location} />
        }
      </div>
    </div>
  ) :
  (
    <div className="screen search-screen">
      <h2>No results for "{props.searchValue}"</h2>
    </div>
  )
}

export default SearchScreen