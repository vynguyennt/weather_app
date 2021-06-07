import React from 'react';
import App from './App';
import { render } from '@testing-library/react';

jest.mock('./common/Utils');

it('renders without crashing', () => {
  const { container } = render(<App />)
  expect(container.firstChild.classList.contains('App')).toBe(true)
});
