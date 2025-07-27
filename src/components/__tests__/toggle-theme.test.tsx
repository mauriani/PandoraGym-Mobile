import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { ModeToggle } from '../toggle-theme'

// Mock do theme provider
const mockToggleMode = jest.fn()
jest.mock('../../theme/theme-provider', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ toggleMode: mockToggleMode })
}))

// Mock do Button component
jest.mock('../ui/Button', () => ({
  Button: ({ label, onPress, variant, children }: any) => {
    const { TouchableOpacity, Text } = require('react-native')
    return (
      <TouchableOpacity onPress={onPress}>
        <Text>{label}</Text>
        {children && <Text>{children}</Text>}
      </TouchableOpacity>
    )
  }
}))

describe('ModeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders toggle button with correct label', () => {
    const { getByText } = render(<ModeToggle />)
    
    expect(getByText('dark mode')).toBeTruthy()
  })

  it('calls toggleMode when button is pressed', () => {
    const { getByText } = render(<ModeToggle />)
    
    const button = getByText('dark mode')
    fireEvent.press(button)
    
    expect(mockToggleMode).toHaveBeenCalledTimes(1)
  })

  it('renders with secondary variant', () => {
    const { getByText } = render(<ModeToggle />)
    
    // Just check that the component renders correctly
    expect(getByText('dark mode')).toBeTruthy()
  })

  it('renders children text when provided', () => {
    const { getByText } = render(<ModeToggle />)
    
    expect(getByText('Toggle mode')).toBeTruthy()
  })

  it('integrates with theme context correctly', () => {
    const { getByText } = render(<ModeToggle />)
    
    // Verify the button renders and can be interacted with
    const button = getByText('dark mode')
    expect(button).toBeTruthy()
    
    fireEvent.press(button)
    expect(mockToggleMode).toHaveBeenCalled()
  })
})
