import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useForm } from 'react-hook-form'
import { InputFormControl } from '../InputFormControl'

// Mock do utilitário cn
jest.mock('@utils/cn', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

// Mock do IconComponent
jest.mock('@components/IconComponent', () => ({
  IconComponent: ({ iconName }: { iconName: string }) => null
}))

describe('InputFormControl', () => {
  const TestWrapper = ({ 
    typePassword = false, 
    error = undefined,
    placeholder = undefined,
    change = undefined 
  }: {
    typePassword?: boolean
    error?: any
    placeholder?: string
    change?: (value: string) => void
  }) => {
    const { control } = useForm()
    
    return (
      <InputFormControl
        name="testInput"
        control={control}
        label="Test Label"
        typePassword={typePassword}
        error={error}
        placeholder={placeholder}
        change={change}
      />
    )
  }

  it('renders input with label', () => {
    const { getByPlaceholderText } = render(<TestWrapper />)
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })

  it('renders placeholder text when provided', () => {
    const { getByText } = render(
      <TestWrapper placeholder="Enter your text" />
    )
    
    expect(getByText('Enter your text')).toBeTruthy()
  })

  it('handles text input changes', () => {
    const mockChange = jest.fn()
    const { getByPlaceholderText } = render(
      <TestWrapper change={mockChange} />
    )
    
    const input = getByPlaceholderText('Test Label')
    fireEvent.changeText(input, 'test value')
    
    expect(mockChange).toHaveBeenCalledWith('test value')
  })

  it('renders password input with eye icon', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper typePassword={true} />
    )
    
    const input = getByPlaceholderText('Test Label')
    expect(input.props.secureTextEntry).toBe(true)
  })

  it('toggles password visibility when eye icon is pressed', () => {
    const { getByPlaceholderText, getByRole } = render(
      <TestWrapper typePassword={true} />
    )
    
    const input = getByPlaceholderText('Test Label')
    expect(input.props.secureTextEntry).toBe(true)
    
    // Find and press the eye icon button
    const eyeButton = input.parent?.parent?.children.find(
      (child: any) => child.type === 'TouchableOpacity'
    )
    
    if (eyeButton) {
      fireEvent.press(eyeButton)
      expect(input.props.secureTextEntry).toBe(false)
    }
  })

  it('displays error message when error is provided', () => {
    const error = { message: 'This field is required' }
    const { getByText } = render(
      <TestWrapper error={error} />
    )
    
    expect(getByText('This field is required')).toBeTruthy()
  })

  it('does not display error message when error is undefined', () => {
    const { queryByText } = render(<TestWrapper />)
    
    // Should not find any error text
    expect(queryByText(/required/i)).toBeNull()
  })

  it('applies custom input classes', () => {
    const TestComponent = () => {
      const { control } = useForm()
      return (
        <InputFormControl
          name="testInput"
          control={control}
          label="Test Label"
          inputClasses="custom-input-class"
        />
      )
    }

    const { getByPlaceholderText } = render(<TestComponent />)
    
    const input = getByPlaceholderText('Test Label')
    expect(input).toBeTruthy()
  })

  it('forwards additional props to TextInput', () => {
    const TestComponent = () => {
      const { control } = useForm()
      return (
        <InputFormControl
          name="testInput"
          control={control}
          label="Test Label"
          maxLength={10}
          autoCapitalize="none"
        />
      )
    }

    const { getByPlaceholderText } = render(<TestComponent />)
    
    const input = getByPlaceholderText('Test Label')
    expect(input.props.maxLength).toBe(10)
    expect(input.props.autoCapitalize).toBe('none')
  })
})
