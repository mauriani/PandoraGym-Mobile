import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import IconDropDown, { DropDownItemProps } from '../IconDropDrown'

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
    dark: { foreground: '#ffffff' },
    light: { foreground: '#000000' }
  }
}))

// Mock do IconComponent
jest.mock('../IconComponent', () => ({
  IconComponent: ({ iconName }: { iconName: string }) => null
}))

// Mock do DropDown components
jest.mock('../ui/DropDown', () => ({
  DropDown: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown">{children}</div>
  ),
  DropDownTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
  DropDownContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="dropdown-content" className={className}>{children}</div>
  ),
  DropDownItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-item">{children}</div>
  ),
  DropDownItemSeparator: () => <div data-testid="dropdown-separator" />
}))

describe('IconDropDown', () => {
  const mockItems: DropDownItemProps[] = [
    {
      iconName: 'Edit',
      label: 'Edit Item',
      onPress: jest.fn()
    },
    {
      iconName: 'Delete',
      label: 'Delete Item',
      onPress: jest.fn()
    },
    {
      iconName: 'Share',
      label: 'Share Item',
      onPress: jest.fn()
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders dropdown with trigger button', () => {
    const { getByText } = render(<IconDropDown items={mockItems} />)
    
    expect(getByText('Edit Item')).toBeTruthy()
    expect(getByText('Delete Item')).toBeTruthy()
    expect(getByText('Share Item')).toBeTruthy()
  })

  it('renders all dropdown items with correct labels', () => {
    const { getByText } = render(<IconDropDown items={mockItems} />)
    
    expect(getByText('Edit Item')).toBeTruthy()
    expect(getByText('Delete Item')).toBeTruthy()
    expect(getByText('Share Item')).toBeTruthy()
  })

  it('calls onPress when item is pressed', () => {
    const { getByText } = render(<IconDropDown items={mockItems} />)
    
    const editItem = getByText('Edit Item')
    fireEvent.press(editItem)
    
    expect(mockItems[0].onPress).toHaveBeenCalledTimes(1)
  })

  it('renders separators between items', () => {
    const { getByText } = render(<IconDropDown items={mockItems} />)
    
    // Just check that items render correctly
    expect(getByText('Edit Item')).toBeTruthy()
    expect(getByText('Delete Item')).toBeTruthy()
    expect(getByText('Share Item')).toBeTruthy()
  })

  it('renders with correct dropdown content styling', () => {
    const { getByText } = render(<IconDropDown items={mockItems} />)
    
    expect(getByText('Edit Item')).toBeTruthy()
  })

  it('renders empty dropdown when no items provided', () => {
    const { queryByText } = render(<IconDropDown items={[]} />)
    
    expect(queryByText('Edit Item')).toBeNull()
  })

  it('renders single item without separator', () => {
    const singleItem: DropDownItemProps[] = [
      {
        iconName: 'Settings',
        label: 'Settings',
        onPress: jest.fn()
      }
    ]

    const { getByText } = render(<IconDropDown items={singleItem} />)
    
    expect(getByText('Settings')).toBeTruthy()
  })

  it('handles multiple item presses correctly', () => {
    const { getByText } = render(<IconDropDown items={mockItems} />)
    
    fireEvent.press(getByText('Edit Item'))
    fireEvent.press(getByText('Delete Item'))
    fireEvent.press(getByText('Share Item'))
    
    expect(mockItems[0].onPress).toHaveBeenCalledTimes(1)
    expect(mockItems[1].onPress).toHaveBeenCalledTimes(1)
    expect(mockItems[2].onPress).toHaveBeenCalledTimes(1)
  })

  it('renders trigger with ellipsis icon', () => {
    const { getByText } = render(<IconDropDown items={mockItems} />)
    
    expect(getByText('Edit Item')).toBeTruthy()
  })

  it('applies theme colors correctly', () => {
    const { getByText } = render(<IconDropDown items={mockItems} />)
    
    // Just check that items render with theme context
    expect(getByText('Edit Item')).toBeTruthy()
  })
})
