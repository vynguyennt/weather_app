import React from 'react'
import StartScreen from './StartScreen'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

test('should render search form', () => {
  const resetBackground = jest.fn()
  let { getByText, container } = render(<StartScreen resetBackground={resetBackground}/>)
  expect(getByText(/Check weather at .../i)).toBeInTheDocument()
  expect(container.querySelector('.search-form')).toBeInTheDocument()
})
