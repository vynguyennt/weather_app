import React from 'react';
import SearchWidget from './SearchWidget';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

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

describe('Search form', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url.indexOf('restcountries.eu/rest/v2/name') >= 0) {
        return Promise.resolve({
          json: () => Promise.resolve(countries)
        })
      }
      if (url.indexOf('wft-geo-db.p.rapidapi.com/v1/geo/cities') >= 0) {
        return Promise.resolve({
          json: () => Promise.resolve(cities)
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

    fireEvent.change(searchInput, { target: { value: 'new' }})

    await waitFor(() => expect(component.getByText('New Zealand (Oceania)', { exact: false })).toBeVisible())
    await waitFor(() => expect(component.getByText('New Auckland (Queensland)', { exact: false })).toBeVisible())
    await waitFor(() => expect(component.getByText('New Beith (Queensland)', { exact: false })).toBeVisible())
    expect(component.container.querySelectorAll('.suggest-list__item')).toHaveLength(3)

    fireEvent.change(searchInput, { target: { value: '' }})
    await waitFor(() => expect(component.container.querySelector('.suggest-list__item')).not.toBeInTheDocument())

  })
})