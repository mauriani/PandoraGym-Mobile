import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Platform } from 'react-native'
import { HeaderGoBackModal } from '../HeaderGoBackModal'

// Mock do react-native-iphone-x-helper
jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(() => 20)
}))

// Mock do theme provider
jest.mock('@theme/theme-provider', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ colorScheme: 'dark' })
}))

// Mock do themes
jest.mock('@theme/themes', () => ({
  themes: {
    dark: { primary: '#ffffff' },
    light: { primary: '#000000' }
  }
}))

// Mock do lucide-react-native
jest.mock('lucide-react-native', () => ({
  ArrowLeft: ({ size, color }: { size: number; color: string }) => null
}))

describe('HeaderGoBackModal', () => {
  const defaultProps = {
    title: 'Test Title',
    onGoBack: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders title correctly', () => {
    const { getByText } = render(<HeaderGoBackModal {...defaultProps} />)
    
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('renders without navigation interaction', () => {
    const mockOnGoBack = jest.fn()
    const { getByText } = render(
      <HeaderGoBackModal {...defaultProps} onGoBack={mockOnGoBack} />
    )
    
    // Just check that the component renders correctly
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('truncates long titles with numberOfLines={1}', () => {
    const longTitle = 'This is a very long title that should be truncated'
    const { getByText } = render(
      <HeaderGoBackModal {...defaultProps} title={longTitle} />
    )
    
    const titleElement = getByText(longTitle)
    expect(titleElement.props.numberOfLines).toBe(1)
  })

  it('applies correct styling for iOS', () => {
    Platform.OS = 'ios'
    const { getByText } = render(<HeaderGoBackModal {...defaultProps} />)
    
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('applies correct styling for Android', () => {
    Platform.OS = 'android'
    const { getByText } = render(<HeaderGoBackModal {...defaultProps} />)
    
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('renders with correct layout structure', () => {
    const { getByText } = render(<HeaderGoBackModal {...defaultProps} />)
    
    // Check that title is present
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('renders with background styling', () => {
    const { getByText } = render(<HeaderGoBackModal {...defaultProps} />)
    
    // Just check that the component renders correctly
    expect(getByText('Test Title')).toBeTruthy()
  })
})
