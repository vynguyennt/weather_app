import React, { Component } from 'react';
import './SearchWidget.css';
import {debounce} from './Utils';

class SearchWidget extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      searchValue: props.searchValue ? props.searchValue : '',
      suggestions: [],
      selected: false
    }
  }

  _isMounted = false

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this.getLocationSuggestion(true, null)
    this._isMounted = false
  }

  getLocationSuggestion = debounce((value) => {
    this.setState({selected: false, suggestions: []}, () => {
      if (value && value.trim().length) {
        this.getSuggestions = fetch(`https://restcountries.eu/rest/v2/name/${value}`)
        .then(res => res.json())
        .then(data => {
          if (this._isMounted) {
            this.setState((state, props) => {
              if (!state.selected && !data.status) return {suggestions: data.map(country => ({
                id: country.alpha3Code,
                name: country.name,
                region: country.region,
                latitude: country.latlng[0],
                longitude: country.latlng[1]
              }))}
              return {suggestions: []}
            })
          }
          return fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=${value}`, {
            headers: {
              "x-rapidapi-key": "95402d4e39msha9374dd685e1f78p1655c6jsn9d03f517101c",
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "useQueryString": true
            }
          })
        })
        .then(res => res.json())
        .then(data => {
          if (this._isMounted) {
            this.setState((state, props) => {
              if (!state.selected) return {suggestions: state.suggestions.concat(data.data)}
              return {suggestions: []}
            })
          }
        })
      }
    })
  }, 1000)

  handleChange = (event) => {
    let value = event.target.value
    this.setState({ 
      searchValue: value,
    })
    this.getLocationSuggestion(false, value)
  }

  handleSubmit = (event) => {
    if(event) event.preventDefault()
  }

  selectCurrentLocation = () => {
    fetch(`https://geolocation-db.com/json/`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        searchValue: data.city,
        lat: data.latitude,
        lon: data.longitude,
        suggestions: [],
        selected: true
      }, () => {
        this.getLocationSuggestion(true, null)
        this.props.handleSearch(this.state.searchValue, this.state.lat, this.state.lon)
      })
    })
  }

  selectCity = (event) => {
    this.setState({
      searchValue: event.target.dataset.name,
      lat: event.target.dataset.lat,
      lon: event.target.dataset.lon,
      suggestions: [],
      selected: true
    }, () => {
      this.getLocationSuggestion(true, null)
      this.props.handleSearch(this.state.searchValue, this.state.lat, this.state.lon)
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        {this.props.showTitle &&
          <h1 className="search-title">Check weather at ...</h1>
        }
        <div className={'search-box' + (this.state.suggestions.length ? ' search-box--with-suggestions' : '')}>
          <input type="text" className="search-input" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search location" />
          <button type="button" className="icon-btn current-location-btn" onClick={this.selectCurrentLocation}>
            <i className="material-icons">gps_fixed</i>
          </button>
          <button type="submit" value="submit" className="icon-btn">
            <i className="material-icons">search</i>
          </button>
        </div>
        <ul className={'suggest-list' + (this.state.suggestions.length ? ' suggest-list--active' : '')}>
          {
            this.state.suggestions.map((city = {}) => (
              <li key={city.id} className="suggest-list__item" onClick={this.selectCity} 
              data-name={city.name} data-lat={city.latitude} data-lon={city.longitude}>
                {city.name} ({city.region})
                </li>
            ))
          }
        </ul>
      </form>
    )
  }
}

export default SearchWidget