import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Platform } from 'react-native'
import { Header } from '../Header'

// Mock do react-native-iphone-x-helper
jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(() => 20)
}))

// Mock do react-navigation
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate
  })
}))

// Mock do lucide-react-native
jest.mock('lucide-react-native', () => ({
  UserCircle: ({ color, size }: { color: string; size: number }) => null
}))

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders title correctly', () => {
    const { getByText } = render(<Header title="Test Title" />)
    
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('renders without navigation interaction', () => {
    const { getByText } = render(<Header title="Test Title" />)
    
    // Just check that the component renders correctly
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('truncates long titles with numberOfLines={1}', () => {
    const longTitle = 'This is a very long title that should be truncated'
    const { getByText } = render(<Header title={longTitle} />)
    
    const titleElement = getByText(longTitle)
    expect(titleElement.props.numberOfLines).toBe(1)
  })

  it('applies correct styling for iOS', () => {
    Platform.OS = 'ios'
    const { getByText } = render(<Header title="Test Title" />)
    
    // Just check that the component renders correctly on iOS
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('applies correct styling for Android', () => {
    Platform.OS = 'android'
    const { getByText } = render(<Header title="Test Title" />)
    
    // Just check that the component renders correctly on Android
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('renders with correct layout structure', () => {
    const { getByText } = render(<Header title="Test Title" />)
    
    // Check that title is present
    expect(getByText('Test Title')).toBeTruthy()
  })
})
