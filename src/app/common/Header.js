import React from 'react'
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom";
import SearchWidget from './SearchWidget'

function Header(props) {
  const path = props.location.pathname.slice(1)
  function handleSearch(searchValue, lat, lon) {
    searchValue = searchValue.trim()
    props.setSearchValue(searchValue)
    if (searchValue && searchValue.length > 2) {
      props.setLocation(lat, lon)
      props.history.push(`/weather/${searchValue}/${lat}/${lon}`)
    }
  }
  return (
    <header className="App-header">
      <Link to="/"><div className="App-logo" alt="logo" /></Link>
      {
        path.length > 0 &&
        <SearchWidget showTitle={false} handleSearch={handleSearch} searchValue={props.searchValue || ''} />
      }
    </header>
  )
}

export default withRouter(Header)
