import React, { Component, Suspense, lazy } from 'react'
import { HashRouter as Router, Route } from "react-router-dom"
import './App.css'
import Header from './common/Header'
import Loading from './common/Loading'
const StartScreen = lazy(() => import('./start/StartScreen'))
const WeatherScreen = lazy(() => import('./weather/WeatherScreen'))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      lat: 0,
      lon: 0,
      time: 'start',
      rain: false,
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  setSearchValue = (value) => {
    this.setState({searchValue: value})
  }

  setLocation = (lat, lon) => {
    this.setState({lat, lon})
  }

  setTimeAndRain = (time, sunrise, sunset, rain) => {
    this.setState({rain})
    if ((sunrise - time) === 1) {
      this.setState({time: 'dawn'})
    } else if (time === sunrise) {
      this.setState({time: 'sunrise'})
    } else if (time <= 12) {
      this.setState({time: 'morning'})
    } else if (time < sunset) {
      this.setState({time: 'afternoon'})
    } else if (time === sunset) {
      this.setState({time: 'sunset'})
    } else if ((sunset - time) === 1) {
      this.setState({time: 'dusk'})
    } else {
      this.setState({time: 'night'})
    }
  }

  resetBackground = () => {
    this.setState({time: 'start', rain: false})
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>Something went wrong...</h1>
      )
    }
    return (
      <Router>
        <div className={`App bg-${this.state.time} ${this.state.rain ? 'bg-rain' : ''}`}>
          <Header setSearchValue={this.setSearchValue} setLocation={this.setLocation} 
            searchValue={this.state.searchValue} lat={this.state.lat} lon={this.state.lon} />
          <Suspense fallback={<Loading/>}>
            <Route path="/" exact render={(props) => 
              <StartScreen {...props} setSearchValue={this.setSearchValue} setLocation={this.setLocation} 
                searchValue={this.state.searchValue} lat={this.state.lat} lon={this.state.lon} resetBackground={this.resetBackground} />} />
            <Route path="/weather/:name/:lat/:lon" render={(props) => 
              <WeatherScreen {...props} searchValue={this.state.searchValue} setTimeAndRain={this.setTimeAndRain} />} />
          </Suspense>
        </div>
      </Router>
    )
  }
}

export default App
