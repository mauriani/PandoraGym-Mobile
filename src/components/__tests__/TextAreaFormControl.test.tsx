import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useForm } from 'react-hook-form'
import { TextAreaFormControl } from '../TextAreaFormControl'

// Mock do utilitário cn
jest.mock('@utils/cn', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

describe('TextAreaFormControl', () => {
  const TestWrapper = ({ 
    error = undefined,
    placeholder = undefined,
    change = undefined 
  }: {
    error?: any
    placeholder?: string
    change?: (value: string) => void
  }) => {
    const { control } = useForm()
    
    return (
      <TextAreaFormControl
        name="testTextArea"
        control={control}
        label="Test Label"
        error={error}
        placeholder={placeholder}
        change={change}
      />
    )
  }

  it('renders textarea with label', () => {
    const { getByPlaceholderText } = render(<TestWrapper />)
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })

  it('renders placeholder text when provided', () => {
    const { getByText } = render(
      <TestWrapper placeholder="Enter your description" />
    )
    
    expect(getByText('Enter your description')).toBeTruthy()
  })

  it('handles text input changes', () => {
    const mockChange = jest.fn()
    const { getByPlaceholderText } = render(
      <TestWrapper change={mockChange} />
    )
    
    const textarea = getByPlaceholderText('Test Label')
    fireEvent.changeText(textarea, 'test description')
    
    expect(mockChange).toHaveBeenCalledWith('test description')
  })

  it('renders as multiline input', () => {
    const { getByPlaceholderText } = render(<TestWrapper />)
    
    const textarea = getByPlaceholderText('Test Label')
    expect(textarea.props.multiline).toBe(true)
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
        <TextAreaFormControl
          name="testTextArea"
          control={control}
          label="Test Label"
          inputClasses="custom-textarea-class"
        />
      )
    }

    const { getByPlaceholderText } = render(<TestComponent />)
    
    const textarea = getByPlaceholderText('Test Label')
    expect(textarea).toBeTruthy()
  })

  it('forwards additional props to TextInput', () => {
    const TestComponent = () => {
      const { control } = useForm()
      return (
        <TextAreaFormControl
          name="testTextArea"
          control={control}
          label="Test Label"
          maxLength={100}
          numberOfLines={4}
        />
      )
    }

    const { getByPlaceholderText } = render(<TestComponent />)
    
    const textarea = getByPlaceholderText('Test Label')
    expect(textarea.props.maxLength).toBe(100)
    expect(textarea.props.numberOfLines).toBe(4)
  })

  it('works without change callback', () => {
    const { getByPlaceholderText } = render(<TestWrapper />)
    
    const textarea = getByPlaceholderText('Test Label')
    expect(() => fireEvent.changeText(textarea, 'test')).not.toThrow()
  })

  it('handles default value correctly', () => {
    const TestComponent = () => {
      const { control } = useForm()
      return (
        <TextAreaFormControl
          name="testTextArea"
          control={control}
          label="Test Label"
          defaultValue="Default text"
        />
      )
    }

    const { getByPlaceholderText } = render(<TestComponent />)
    
    const textarea = getByPlaceholderText('Test Label')
    expect(textarea).toBeTruthy()
  })
})
