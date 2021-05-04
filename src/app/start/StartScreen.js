import React, { Component } from 'react'
import { Redirect, } from "react-router-dom"
import SearchWidget from '../common/SearchWidget'

class StartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToResult: false
    }
  }
  handleSearch = (searchValue, lat, lon) => {
    searchValue = searchValue.trim()
    this.props.setSearchValue(searchValue)
    if (searchValue && searchValue.length > 2) {
      this.props.setLocation(lat, lon)
      this.setState({ redirectToResult: true })
    }
  }
  componentDidMount() {
    this.props.resetBackground()
  }
  render() {
    if (this.state.redirectToResult) return <Redirect to={`/weather/${this.props.searchValue}/${this.props.lat}/${this.props.lon}`} />

    return (
      <div className="screen">
        <SearchWidget showTitle={true} handleSearch={this.handleSearch} searchValue={this.props.searchValue || ''} />
      </div>
    )
  }
}

export default StartScreen
