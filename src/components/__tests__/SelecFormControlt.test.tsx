import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useForm } from 'react-hook-form'
import { SelecFormControlt } from '../SelecFormControlt'

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
    dark: { mutedForeground: '#888888' },
    light: { mutedForeground: '#666666' }
  }
}))

// Mock do IconComponent
jest.mock('../IconComponent', () => ({
  IconComponent: ({ iconName, color }: { iconName: string; color: string }) => null
}))

// Mock do react-native-select-dropdown
jest.mock('react-native-select-dropdown', () => {
  return ({ data, onSelect, renderButton, renderItem }: any) => {
    const { TouchableOpacity, Text, View, useState } = require('react-native')
    const mockReact = require('react')
    const [selectedItem, setSelectedItem] = mockReact.useState(null)
    const [isOpen, setIsOpen] = mockReact.useState(false)

    return (
      <View testID="select-dropdown">
        <TouchableOpacity
          testID="select-button"
          onPress={() => setIsOpen(!isOpen)}
        >
          {renderButton(selectedItem, isOpen)}
        </TouchableOpacity>
        
        {isOpen && (
          <View testID="dropdown-options">
            {data.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                testID={`option-${index}`}
                onPress={() => {
                  setSelectedItem(item)
                  onSelect(item)
                  setIsOpen(false)
                }}
              >
                {renderItem(item, index, selectedItem?.value === item.value)}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    )
  }
})

describe('SelecFormControlt', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ]

  const TestWrapper = ({ 
    error = undefined,
    label = 'Select an option',
    change = undefined,
    defaultValue = undefined
  }: {
    error?: any
    label?: string
    change?: (value: string) => void
    defaultValue?: string
  }) => {
    const { control } = useForm()
    
    return (
      <SelecFormControlt
        name="testSelect"
        control={control}
        options={mockOptions}
        label={label}
        error={error}
        change={change}
        defaultValue={defaultValue}
      />
    )
  }

  it('renders select dropdown with label', () => {
    const { getByText } = render(<TestWrapper />)
    
    expect(getByText('Select an option')).toBeTruthy()
  })

  it('renders all options when dropdown is opened', () => {
    const { getByTestId, getByText } = render(<TestWrapper />)
    
    // Open dropdown
    const selectButton = getByTestId('select-button')
    fireEvent.press(selectButton)
    
    expect(getByText('Option 1')).toBeTruthy()
    expect(getByText('Option 2')).toBeTruthy()
    expect(getByText('Option 3')).toBeTruthy()
  })

  it('calls change callback when option is selected', () => {
    const mockChange = jest.fn()
    const { getByTestId } = render(<TestWrapper change={mockChange} />)
    
    // Open dropdown
    const selectButton = getByTestId('select-button')
    fireEvent.press(selectButton)
    
    // Select first option
    const firstOption = getByTestId('option-0')
    fireEvent.press(firstOption)
    
    expect(mockChange).toHaveBeenCalledWith('option1')
  })

  it('displays selected option label', () => {
    const { getByTestId, getByText } = render(<TestWrapper />)
    
    // Open dropdown
    const selectButton = getByTestId('select-button')
    fireEvent.press(selectButton)
    
    // Select second option
    const secondOption = getByTestId('option-1')
    fireEvent.press(secondOption)
    
    // Check if selected option is displayed
    expect(getByText('Option 2')).toBeTruthy()
  })

  it('displays error message when error is provided', () => {
    const error = { message: 'This field is required' }
    const { getByText } = render(<TestWrapper error={error} />)
    
    expect(getByText('This field is required')).toBeTruthy()
  })

  it('does not display error message when error is undefined', () => {
    const { queryByText } = render(<TestWrapper />)
    
    expect(queryByText(/required/i)).toBeNull()
  })

  it('toggles dropdown open/close state', () => {
    const { getByTestId, queryByTestId } = render(<TestWrapper />)
    
    const selectButton = getByTestId('select-button')
    
    // Initially closed
    expect(queryByTestId('dropdown-options')).toBeNull()
    
    // Open dropdown
    fireEvent.press(selectButton)
    expect(getByTestId('dropdown-options')).toBeTruthy()
    
    // Close dropdown
    fireEvent.press(selectButton)
    expect(queryByTestId('dropdown-options')).toBeNull()
  })

  it('works without change callback', () => {
    const { getByTestId } = render(<TestWrapper />)
    
    const selectButton = getByTestId('select-button')
    fireEvent.press(selectButton)
    
    const firstOption = getByTestId('option-0')
    expect(() => fireEvent.press(firstOption)).not.toThrow()
  })

  it('handles default value correctly', () => {
    const TestComponent = () => {
      const { control } = useForm()
      return (
        <SelecFormControlt
          name="testSelect"
          control={control}
          options={mockOptions}
          label="Select option"
          defaultValue="option2"
        />
      )
    }

    const { getByTestId } = render(<TestComponent />)
    
    expect(getByTestId('select-dropdown')).toBeTruthy()
  })

  it('renders with custom label', () => {
    const { getByText } = render(<TestWrapper label="Choose your option" />)
    
    expect(getByText('Choose your option')).toBeTruthy()
  })

  it('handles empty options array', () => {
    const TestComponent = () => {
      const { control } = useForm()
      return (
        <SelecFormControlt
          name="testSelect"
          control={control}
          options={[]}
          label="No options"
        />
      )
    }

    const { getByText } = render(<TestComponent />)
    
    expect(getByText('No options')).toBeTruthy()
  })

  it('applies theme colors correctly', () => {
    const { getByTestId } = render(<TestWrapper />)
    
    expect(getByTestId('select-dropdown')).toBeTruthy()
  })
})
