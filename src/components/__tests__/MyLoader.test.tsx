import React from 'react'
import { render } from '@testing-library/react-native'
import MyLoader from '../MyLoader'

jest.mock('react-content-loader/native', () => ({
  __esModule: true,
  default: ({ children }) => children,
  Circle: () => null,
  Rect: () => null,
}))

describe('MyLoader', () => {
  it('renders without crashing', () => {
    expect(() => render(<MyLoader />)).not.toThrow()
  })
})