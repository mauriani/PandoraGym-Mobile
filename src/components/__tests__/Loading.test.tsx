import React from 'react'
import { render } from '@testing-library/react-native'
import { ActivityIndicator } from 'react-native'
import { Loading } from '../Loading'

jest.mock('@theme/theme-provider', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ colorScheme: 'dark' })
}))

describe('Loading', () => {
  it('renders activity indicator', () => {
    const { UNSAFE_getByType } = render(<Loading />)
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy()
  })

  it('has correct container styling', () => {
    const { UNSAFE_getByType } = render(<Loading />)
    const container = UNSAFE_getByType(ActivityIndicator).parent
    expect(container).toBeTruthy()
  })
})