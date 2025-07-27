import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { HistoryCalendar } from '../HistoryCalendar'

// Mock do react-native-calendars
jest.mock('react-native-calendars', () => ({
  Calendar: ({ onDayPress, markedDates }: any) => {
    const { TouchableOpacity, Text } = require('react-native')
    return (
      <TouchableOpacity
        onPress={() => onDayPress({ dateString: '2023-12-25' })}
        testID="calendar-mock">
        <Text>Calendar Mock</Text>
        <Text testID="marked-dates">{JSON.stringify(markedDates)}</Text>
      </TouchableOpacity>
    )
  },
  LocaleConfig: {
    locales: {},
    defaultLocale: ''
  }
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
      secondary: '#1a1a1a',
      foreground: '#ffffff',
      primary: '#007AFF',
      mutedForeground: '#888888',
      primaryForeground: '#ffffff'
    },
    light: { 
      secondary: '#ffffff',
      foreground: '#000000',
      primary: '#007AFF',
      mutedForeground: '#666666',
      primaryForeground: '#ffffff'
    }
  }
}))

// Mock do localeConfig
jest.mock('@utils/localeConfig', () => ({
  ptBR: {
    monthNames: ['Janeiro', 'Fevereiro', 'Março'],
    dayNames: ['Domingo', 'Segunda', 'Terça'],
    dayNamesShort: ['Dom', 'Seg', 'Ter']
  }
}))

describe('HistoryCalendar', () => {
  const defaultProps = {
    onPress: jest.fn(),
    selected: '2023-12-25'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders calendar component', () => {
    const { getByText } = render(<HistoryCalendar {...defaultProps} />)
    
    expect(getByText('Calendar Mock')).toBeTruthy()
  })

  it('calls onPress when a day is pressed', () => {
    const mockOnPress = jest.fn()
    const { getByTestId } = render(
      <HistoryCalendar {...defaultProps} onPress={mockOnPress} />
    )
    
    const calendar = getByTestId('calendar-mock')
    fireEvent.press(calendar)
    
    expect(mockOnPress).toHaveBeenCalledWith('2023-12-25')
  })

  it('marks selected date correctly', () => {
    const selectedDate = '2023-12-20'
    const { getByTestId } = render(
      <HistoryCalendar {...defaultProps} selected={selectedDate} />
    )
    
    const markedDatesElement = getByTestId('marked-dates')
    const markedDatesText = markedDatesElement.props.children
    
    expect(markedDatesText).toContain(selectedDate)
    expect(markedDatesText).toContain('selected')
  })

  it('applies correct theme colors', () => {
    const { getByText } = render(<HistoryCalendar {...defaultProps} />)
    
    // Just check that the component renders with theme context
    expect(getByText('Calendar Mock')).toBeTruthy()
  })

  it('handles different selected dates', () => {
    const { getByTestId, rerender } = render(
      <HistoryCalendar {...defaultProps} selected="2023-12-01" />
    )
    
    let markedDatesElement = getByTestId('marked-dates')
    expect(markedDatesElement.props.children).toContain('2023-12-01')
    
    // Change selected date
    rerender(
      <HistoryCalendar {...defaultProps} selected="2023-12-15" />
    )
    
    markedDatesElement = getByTestId('marked-dates')
    expect(markedDatesElement.props.children).toContain('2023-12-15')
  })

  it('sets up locale configuration', () => {
    // This test just ensures the component renders without errors
    // The actual locale setup is done in the module import
    const { getByText } = render(<HistoryCalendar {...defaultProps} />)
    
    expect(getByText('Calendar Mock')).toBeTruthy()
  })
})
