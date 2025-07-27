import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { InputWithButton } from '../InputWithButton'

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
    dark: { primaryForeground: '#ffffff' },
    light: { primaryForeground: '#000000' }
  }
}))

// Mock do IconComponent
jest.mock('../IconComponent', () => ({
  IconComponent: ({ iconName, color, size }: any) => null
}))

// Mock do InputFormControl
jest.mock('../ui/InputFormControl', () => ({
  InputFormControl: ({ control, name, label, error, change, ...props }: any) => {
    const { TextInput } = require('react-native')
    return (
      <TextInput
        placeholder={label}
        onChangeText={(text) => {
          change && change(text)
        }}
        {...props}
      />
    )
  }
}))

describe('InputWithButton', () => {
  const defaultProps = {
    iconName: 'Plus' as const,
    label: 'Test Label',
    onNavigate: jest.fn(),
    onChangeText: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders input with correct label', () => {
    const { getByPlaceholderText } = render(<InputWithButton {...defaultProps} />)
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })

  it('calls onChangeText when input text changes', () => {
    const mockOnChangeText = jest.fn()
    const { getByPlaceholderText } = render(
      <InputWithButton {...defaultProps} onChangeText={mockOnChangeText} />
    )
    
    const input = getByPlaceholderText('Test Label')
    fireEvent.changeText(input, 'test input')
    
    expect(mockOnChangeText).toHaveBeenCalledWith('test input')
  })

  it('renders with custom icon size', () => {
    const { getByPlaceholderText } = render(
      <InputWithButton {...defaultProps} size={32} />
    )
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })

  it('renders component structure correctly', () => {
    const { getByPlaceholderText } = render(<InputWithButton {...defaultProps} />)
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })

  it('works without onChangeText callback', () => {
    const { getByPlaceholderText } = render(
      <InputWithButton 
        iconName="Plus"
        label="Test Label"
        onNavigate={jest.fn()}
      />
    )
    
    const input = getByPlaceholderText('Test Label')
    expect(() => fireEvent.changeText(input, 'test')).not.toThrow()
  })

  it('renders with different icon names', () => {
    const { getByPlaceholderText } = render(
      <InputWithButton 
        {...defaultProps}
        iconName="Search"
      />
    )
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })

  it('handles form structure correctly', () => {
    const { getByPlaceholderText } = render(<InputWithButton {...defaultProps} />)
    
    const input = getByPlaceholderText('Test Label')
    fireEvent.changeText(input, 'valid text')
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })
})
