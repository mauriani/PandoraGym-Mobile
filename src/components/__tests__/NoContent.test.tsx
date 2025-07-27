import React from 'react'
import { render } from '@testing-library/react-native'
import { NoContent } from '../NoContent'

jest.mock('@assets/svg/gym-fitness.svg', () => () => null)

jest.mock('@theme/theme-provider', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ colorScheme: 'dark' })
}))

describe('NoContent', () => {
  it('renders message correctly', () => {
    const { getByText } = render(<NoContent message="No content available" />)
    expect(getByText('No content available')).toBeTruthy()
  })

  it('renders without crashing', () => {
    const { root } = render(<NoContent message="Test message" />)
    expect(root).toBeTruthy()
  })
})