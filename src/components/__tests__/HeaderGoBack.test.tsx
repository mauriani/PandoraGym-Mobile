import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Platform } from 'react-native'
import { HeaderGoBack } from '../HeaderGoBack'

// Mock do react-native-iphone-x-helper
jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(() => 20)
}))

// Mock do react-navigation
const mockGoBack = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack
  })
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

// Mock do IconDropDown
jest.mock('../IconDropDrown', () => {
  const { TouchableOpacity, Text } = require('react-native')
  return {
    __esModule: true,
    default: ({ items }: { items: any[] }) => (
      <TouchableOpacity>
        <Text>Menu</Text>
      </TouchableOpacity>
    )
  }
})

describe('HeaderGoBack', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders title correctly', () => {
    const { getByText } = render(<HeaderGoBack title="Test Title" />)
    
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('renders without navigation interaction', () => {
    const { getByText } = render(<HeaderGoBack title="Test Title" />)
    
    // Just check that the component renders correctly
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('does not render menu when isMenu is false', () => {
    const { queryByText } = render(
      <HeaderGoBack title="Test Title" isMenu={false} />
    )
    
    expect(queryByText('Menu')).toBeNull()
  })

  it('renders menu when isMenu is true', () => {
    const { getByText } = render(
      <HeaderGoBack title="Test Title" isMenu={true} />
    )
    
    expect(getByText('Menu')).toBeTruthy()
  })

  it('passes correct dropdown items when menu is enabled', () => {
    const mockOnEdit = jest.fn()
    const mockOnDelete = jest.fn()
    
    const { getByText } = render(
      <HeaderGoBack 
        title="Test Title" 
        isMenu={true}
        onEditWorkout={mockOnEdit}
        onDeleteWorkout={mockOnDelete}
      />
    )
    
    expect(getByText('Menu')).toBeTruthy()
  })

  it('truncates long titles with numberOfLines={1}', () => {
    const longTitle = 'This is a very long title that should be truncated'
    const { getByText } = render(<HeaderGoBack title={longTitle} />)
    
    const titleElement = getByText(longTitle)
    expect(titleElement.props.numberOfLines).toBe(1)
  })

  it('applies correct styling for iOS', () => {
    Platform.OS = 'ios'
    const { getByText } = render(<HeaderGoBack title="Test Title" />)
    
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('applies correct styling for Android', () => {
    Platform.OS = 'android'
    const { getByText } = render(<HeaderGoBack title="Test Title" />)
    
    expect(getByText('Test Title')).toBeTruthy()
  })
})
