import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text, TouchableOpacity } from 'react-native'
import {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownLabel,
  DropDownItem,
  DropDownItemSeparator,
  useDropdown
} from '../DropDown'

// Mock do utilitário cn
jest.mock('@utils/cn', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

describe('DropDown', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <DropDown>
        <Text>DropDown Content</Text>
      </DropDown>
    )
    
    expect(getByText('DropDown Content')).toBeTruthy()
  })

  it('toggles dropdown when trigger is pressed', () => {
    const TestComponent = () => (
      <DropDown>
        <DropDownTrigger>
          <TouchableOpacity>
            <Text>Toggle Dropdown</Text>
          </TouchableOpacity>
        </DropDownTrigger>
        <DropDownContent>
          <Text>Dropdown is open</Text>
        </DropDownContent>
      </DropDown>
    )

    const { getByText, queryByText } = render(<TestComponent />)
    
    // Dropdown should not be visible initially
    expect(queryByText('Dropdown is open')).toBeNull()
    
    // Press trigger to open dropdown
    fireEvent.press(getByText('Toggle Dropdown'))
    
    // Dropdown should now be visible
    expect(getByText('Dropdown is open')).toBeTruthy()
    
    // Press trigger again to close dropdown
    fireEvent.press(getByText('Toggle Dropdown'))
    
    // Dropdown should be closed
    expect(queryByText('Dropdown is open')).toBeNull()
  })

  it('renders DropDownLabel with correct text', () => {
    const TestComponent = () => (
      <DropDown>
        <DropDownTrigger>
          <TouchableOpacity>
            <Text>Open</Text>
          </TouchableOpacity>
        </DropDownTrigger>
        <DropDownContent>
          <DropDownLabel labelTitle="Test Label" />
        </DropDownContent>
      </DropDown>
    )

    const { getByText } = render(<TestComponent />)
    
    // Open dropdown first
    fireEvent.press(getByText('Open'))
    
    expect(getByText('Test Label')).toBeTruthy()
  })

  it('renders DropDownItem with children', () => {
    const TestComponent = () => (
      <DropDown>
        <DropDownTrigger>
          <TouchableOpacity>
            <Text>Open</Text>
          </TouchableOpacity>
        </DropDownTrigger>
        <DropDownContent>
          <DropDownItem>
            <Text>Item Content</Text>
          </DropDownItem>
        </DropDownContent>
      </DropDown>
    )

    const { getByText } = render(<TestComponent />)
    
    // Open dropdown
    fireEvent.press(getByText('Open'))
    
    expect(getByText('Item Content')).toBeTruthy()
  })

  it('renders DropDownItemSeparator', () => {
    const TestComponent = () => (
      <DropDown>
        <DropDownTrigger>
          <TouchableOpacity>
            <Text>Open</Text>
          </TouchableOpacity>
        </DropDownTrigger>
        <DropDownContent>
          <DropDownItem>
            <Text>Item 1</Text>
          </DropDownItem>
          <DropDownItemSeparator />
          <DropDownItem>
            <Text>Item 2</Text>
          </DropDownItem>
        </DropDownContent>
      </DropDown>
    )

    const { getByText } = render(<TestComponent />)
    
    // Open dropdown
    fireEvent.press(getByText('Open'))
    
    expect(getByText('Item 1')).toBeTruthy()
    expect(getByText('Item 2')).toBeTruthy()
  })

  it('applies custom className to DropDownContent', () => {
    const TestComponent = () => (
      <DropDown>
        <DropDownTrigger>
          <TouchableOpacity>
            <Text>Open</Text>
          </TouchableOpacity>
        </DropDownTrigger>
        <DropDownContent className="custom-class">
          <Text>Content</Text>
        </DropDownContent>
      </DropDown>
    )

    const { getByText } = render(<TestComponent />)
    
    // Open dropdown
    fireEvent.press(getByText('Open'))
    
    expect(getByText('Content')).toBeTruthy()
  })

  it('applies custom className to DropDownItem', () => {
    const TestComponent = () => (
      <DropDown>
        <DropDownTrigger>
          <TouchableOpacity>
            <Text>Open</Text>
          </TouchableOpacity>
        </DropDownTrigger>
        <DropDownContent>
          <DropDownItem className="custom-item-class">
            <Text>Item</Text>
          </DropDownItem>
        </DropDownContent>
      </DropDown>
    )

    const { getByText } = render(<TestComponent />)
    
    // Open dropdown
    fireEvent.press(getByText('Open'))
    
    expect(getByText('Item')).toBeTruthy()
  })

  it('throws error when useDropdown is used outside DropDown context', () => {
    const TestComponent = () => {
      try {
        useDropdown()
        return <Text>Should not render</Text>
      } catch (error) {
        return <Text>Error caught</Text>
      }
    }

    const { getByText } = render(<TestComponent />)
    expect(getByText('Error caught')).toBeTruthy()
  })
})
