import React from 'react'
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom";
import SearchWidget from './SearchWidget'
import './Header.css'

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
    <header className={'App-header ' + (path.length > 0 ? '' : 'start-header')}>
      {
        path.length > 0 ?
        (
          <React.Fragment>
            <SearchWidget showTitle={false} handleSearch={handleSearch} searchValue={props.searchValue || ''} />
            <Link to={path === 'favorite' ? '/' : '/favorite'} className="favorite-link icon-btn">
              <i className="material-icons">{path === 'favorite' ? 'home' : 'grid_view'}</i>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/"><div className="App-logo" alt="logo" /></Link>
            <Link to="favorite" className="favorite-link icon-btn">
              <i className="material-icons">grid_view</i>
            </Link>
          </React.Fragment>
          
        )
      }
    </header>
  )
}

export default withRouter(Header)
