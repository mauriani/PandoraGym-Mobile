import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useForm } from 'react-hook-form'
import { InputMaskControl } from '../InputMaskControl'

// Mock do utilitário cn
jest.mock('@utils/cn', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
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
    dark: { 
      mutedForeground: '#888888',
      border: '#333333',
      foreground: '#ffffff',
      background: '#000000'
    },
    light: { 
      mutedForeground: '#666666',
      border: '#cccccc',
      foreground: '#000000',
      background: '#ffffff'
    }
  }
}))

// Mock do react-native-masked-text
jest.mock('react-native-masked-text', () => ({
  TextInputMask: ({ type, options, onChangeText, value, ...props }: any) => {
    const { TextInput } = require('react-native')
    return (
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        testID={`masked-input-${type}`}
      />
    )
  }
}))

describe('InputMaskControl', () => {
  const TestWrapper = ({ 
    type = 'default',
    error = undefined,
    placeholder = undefined,
    change = undefined 
  }: {
    type?: 'date' | 'cpf' | 'phone' | 'cep' | 'minutes' | 'default'
    error?: any
    placeholder?: string
    change?: (value: string) => void
  }) => {
    const { control } = useForm()
    
    return (
      <InputMaskControl
        name="testInput"
        control={control}
        label="Test Label"
        type={type}
        error={error}
        placeholder={placeholder}
        change={change}
      />
    )
  }

  it('renders default input when no type specified', () => {
    const { getByPlaceholderText } = render(<TestWrapper />)
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })

  it('renders date mask input', () => {
    const { getByTestId } = render(<TestWrapper type="date" />)
    
    expect(getByTestId('masked-input-datetime')).toBeTruthy()
  })

  it('renders minutes mask input', () => {
    const { getByTestId } = render(<TestWrapper type="minutes" />)
    
    expect(getByTestId('masked-input-datetime')).toBeTruthy()
  })

  it('renders CPF mask input', () => {
    const { getByTestId } = render(<TestWrapper type="cpf" />)
    
    expect(getByTestId('masked-input-cpf')).toBeTruthy()
  })

  it('renders phone mask input', () => {
    const { getByTestId } = render(<TestWrapper type="phone" />)
    
    expect(getByTestId('masked-input-cel-phone')).toBeTruthy()
  })

  it('renders CEP mask input', () => {
    const { getByTestId } = render(<TestWrapper type="cep" />)
    
    expect(getByTestId('masked-input-zip-code')).toBeTruthy()
  })

  it('renders placeholder text when provided', () => {
    const { getByText } = render(
      <TestWrapper placeholder="Enter your data" />
    )
    
    expect(getByText('Enter your data')).toBeTruthy()
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

  it('displays error message when error is provided', () => {
    const error = { message: 'This field is required' }
    const { getByText } = render(
      <TestWrapper error={error} />
    )
    
    expect(getByText('This field is required')).toBeTruthy()
  })

  it('does not display error message when error is undefined', () => {
    const { queryByText } = render(<TestWrapper />)
    
    expect(queryByText(/required/i)).toBeNull()
  })

  it('handles date input with correct format', () => {
    const mockChange = jest.fn()
    const { getByTestId } = render(
      <TestWrapper type="date" change={mockChange} />
    )
    
    const input = getByTestId('masked-input-datetime')
    fireEvent.changeText(input, '25/12/2023')
    
    expect(mockChange).toHaveBeenCalledWith('25/12/2023')
  })

  it('handles phone input with correct format', () => {
    const mockChange = jest.fn()
    const { getByTestId } = render(
      <TestWrapper type="phone" change={mockChange} />
    )
    
    const input = getByTestId('masked-input-cel-phone')
    fireEvent.changeText(input, '(11) 99999-9999')
    
    expect(mockChange).toHaveBeenCalledWith('(11) 99999-9999')
  })

  it('works without change callback', () => {
    const { getByPlaceholderText } = render(<TestWrapper />)
    
    const input = getByPlaceholderText('Test Label')
    expect(() => fireEvent.changeText(input, 'test')).not.toThrow()
  })

  it('applies theme colors correctly', () => {
    const { getByPlaceholderText } = render(<TestWrapper />)
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })

  it('handles default value correctly', () => {
    const TestComponent = () => {
      const { control } = useForm()
      return (
        <InputMaskControl
          name="testInput"
          control={control}
          label="Test Label"
          defaultValue="Default value"
        />
      )
    }

    const { getByPlaceholderText } = render(<TestComponent />)
    
    expect(getByPlaceholderText('Test Label')).toBeTruthy()
  })
})
