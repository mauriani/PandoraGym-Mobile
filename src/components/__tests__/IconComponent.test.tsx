import React from 'react'
import { render } from '@testing-library/react-native'
import { IconComponent } from '../IconComponent'

jest.mock('@theme/theme-provider', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ colorScheme: 'dark' })
}))

jest.mock('lucide-react-native', () => ({
  Calendar: () => null,
  Plus: () => null,
}))

describe('IconComponent', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<IconComponent iconName="Calendar" />)
    // Since the component renders an icon, we can check if it renders without error
    expect(() => render(<IconComponent iconName="Calendar" />)).not.toThrow()
  })

  it('renders with custom props', () => {
    const { getByTestId } = render(
      <IconComponent iconName="Plus" size={32} color="#ff0000" />
    )
    // Check that component renders without throwing
    expect(() => render(<IconComponent iconName="Plus" size={32} color="#ff0000" />)).not.toThrow()
  })
})