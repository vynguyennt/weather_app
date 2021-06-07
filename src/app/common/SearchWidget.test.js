import React from 'react'
import SearchWidget from './SearchWidget'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

const countries = [
  {
    name: "New Zealand",
    alpha3Code: "NZL",
    region: "Oceania",
    latlng: [
      -41.0,
      174.0
    ]
  }
]
const cities = {
  "data":[
    {
       "id":989433,
       "city":"New Auckland",
       "name":"New Auckland",
       "country":"Australia",
       "countryCode":"AU",
       "region":"Queensland",
       "latitude":-23.88333333,
       "longitude":151.23666667
    },
    {
      "id":988510,
      "city":"New Beith",
      "name":"New Beith",
      "country":"Australia",
      "countryCode":"AU",
      "region":"Queensland",
      "latitude":-27.742,
      "longitude":152.947,
   }
  ]
}

const currentLocation = {
  country_code: "SG",
  country_name: "Singapore",
  city: "Singapore",
  latitude: 1.2931,
  longitude: 103.8558
 }

describe('Search form', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url.indexOf('restcountries.eu/rest/v2/name') >= 0) {
        return Promise.resolve({
          json: () => Promise.resolve(countries)
        })
      } else if (url.indexOf('wft-geo-db.p.rapidapi.com/v1/geo/cities') >= 0) {
        return Promise.resolve({
          json: () => Promise.resolve(cities)
        })
      } else if (url.indexOf('geolocation-db.com/json') >= 0) {
        return Promise.resolve({
          json: () => Promise.resolve(currentLocation)
        })
      }
    })
  })

  afterAll(() => {
    global.fetch.mockRestore()
  })

  test('should be rendered', () => {
    const handleSearch = jest.fn()
    let { getByPlaceholderText, getByRole } = render(<SearchWidget showTitle={false} handleSearch={handleSearch} searchValue='singapore' />)
    let searchInput = getByPlaceholderText('Search location')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput.value).toBe('singapore')
  
    expect(getByRole('button', { name: /gps_fixed/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  test('should render suggestions list correctly', async () => {
    const handleSearch = jest.fn()
    let component = render(<SearchWidget showTitle={false} handleSearch={handleSearch} searchValue='' />)
    let searchInput = component.getByPlaceholderText('Search location')

    // Suggestions list should have 3 items when search value is 'new'
    fireEvent.change(searchInput, { target: { value: 'new' }})

    await waitFor(() => expect(component.getByText('New Zealand (Oceania)', { exact: false })).toBeVisible())
    await waitFor(() => expect(component.getByText('New Auckland (Queensland)', { exact: false })).toBeVisible())
    await waitFor(() => expect(component.getByText('New Beith (Queensland)', { exact: false })).toBeVisible())
    expect(component.container.querySelectorAll('.suggest-list__item')).toHaveLength(3)

    // Suggestions list should be empty when search value is empty
    fireEvent.change(searchInput, { target: { value: '' }})
    await waitFor(() => expect(component.container.querySelector('.suggest-list__item')).not.toBeInTheDocument())
  })

  test('should submit selected location', async () => {
    const handleSearch = jest.fn()
    // render search component with empty value in search textbox
    let component = render(<SearchWidget showTitle={false} handleSearch={handleSearch} searchValue='' />)
    let searchInput = component.getByPlaceholderText('Search location')

    // get suggestions list with 'new' search value
    fireEvent.change(searchInput, { target: { value: 'new' }})
    await waitFor(() => expect(component.container.querySelectorAll('.suggest-list__item')).toHaveLength(3))

    // check that first item should be highlighted by default
    let suggestionList = component.container.querySelector('.suggest-list')
    expect(suggestionList.childNodes[0].classList.contains('suggest-list__item--active')).toBe(true)
    expect(suggestionList.childNodes[1].classList.contains('suggest-list__item--active')).toBe(false)

    // check that second item should be highlighted when pressing 'arrow down'
    fireEvent.keyUp(component.container.querySelector('.search-form'), {key: 'ArrowDown', code: 'ArrowDown', keyCode: 40})
    expect(suggestionList.childNodes[0].classList.contains('suggest-list__item--active')).toBe(false)
    expect(suggestionList.childNodes[1].classList.contains('suggest-list__item--active')).toBe(true)

    // check that second item should be submitted as selected location when pressing 'enter'
    fireEvent.keyUp(component.container.querySelector('.search-form'), {key: 'Enter', code: 'Enter', keyCode: 13})
    expect(handleSearch).toBeCalledTimes(1)
    expect(handleSearch).toBeCalledWith('New Auckland', -23.88333333, 151.23666667)
  })

  test('should submit current location as selected location', async () => {
    const handleSearch = jest.fn()
    // render search component with empty value in search textbox
    let component = render(<SearchWidget showTitle={false} handleSearch={handleSearch} searchValue='' />)

    userEvent.click(component.getByRole('button', { name: /gps_fixed/i }))
    await waitFor(() => expect(handleSearch).toBeCalledTimes(1))
    expect(handleSearch).toBeCalledWith('Singapore', 1.2931, 103.8558)
  })
})