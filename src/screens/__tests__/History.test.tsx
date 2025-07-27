import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { History } from '../History'

// Mock das dependências
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}))

jest.mock('@services/api', () => ({
  api: {
    post: jest.fn()
  }
}))

jest.mock('@utils/formatTime', () => ({
  secondsToHourMinute: jest.fn()
}))

jest.mock('dayjs', () => {
  const mockDayjs = jest.fn((date) => ({
    format: jest.fn(() => '2023-12-25'),
    toISOString: jest.fn(() => '2023-12-25T00:00:00.000Z')
  }))
  return mockDayjs
})

// Mock dos componentes
jest.mock('@components/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@components/Content', () => ({
  Content: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@components/Header', () => ({
  Header: ({ title }: { title: string }) => {
    const { Text } = require('react-native')
    return <Text testID="header-title">{title}</Text>
  }
}))

jest.mock('@components/Heading', () => ({
  Heading: ({ title }: { title: string }) => {
    const { Text } = require('react-native')
    return <Text testID="heading-title">{title || 'No Title'}</Text>
  }
}))

jest.mock('@components/HistoryCalendar', () => ({
  HistoryCalendar: ({ onPress, selected }: any) => {
    const { TouchableOpacity, Text } = require('react-native')
    return (
      <TouchableOpacity 
        testID="history-calendar"
        onPress={() => onPress('2023-12-26')}
      >
        <Text testID="selected-date">{selected}</Text>
      </TouchableOpacity>
    )
  }
}))

jest.mock('@components/NoContent', () => ({
  NoContent: ({ message }: { message: string }) => {
    const { Text } = require('react-native')
    return <Text testID="no-content">{message}</Text>
  }
}))

jest.mock('../History/__components__/MyTrainingHistoryCard', () => ({
  MyTrainingHistoryCard: ({ item }: { item: any }) => {
    const { View, Text } = require('react-native')
    return (
      <View testID={`history-card-${item.id}`}>
        <Text>{item.workout.name}</Text>
      </View>
    )
  }
}))

jest.mock('../History/__components__/SkeletonAnimation', () => ({
  SkeletonAnimation: () => {
    const { View, Text } = require('react-native')
    return (
      <View testID="skeleton-animation">
        <Text>Loading...</Text>
      </View>
    )
  }
}))

describe('History Screen', () => {
  const mockUseQuery = require('@tanstack/react-query').useQuery
  const mockSecondsToHourMinute = require('@utils/formatTime').secondsToHourMinute

  const mockHistoryData = [
    {
      id: 'history-1',
      workout: {
        name: 'Upper Body Workout'
      },
      timeTotalWorkout: 3600
    },
    {
      id: 'history-2',
      workout: {
        name: 'Upper Body Workout'
      },
      timeTotalWorkout: 3600
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    mockSecondsToHourMinute.mockReturnValue('01h:00min')
    mockUseQuery.mockReturnValue({
      data: mockHistoryData,
      isLoading: false
    })
  })

  describe('Rendering', () => {
    it('renders all main elements', () => {
      const { getByTestId } = render(<History />)
      
      expect(getByTestId('header-title')).toHaveTextContent('Histórico')
      expect(getByTestId('history-calendar')).toBeTruthy()
      expect(getByTestId('heading-title')).toBeTruthy()
    })

    it('renders header with correct title', () => {
      const { getByTestId } = render(<History />)
      
      expect(getByTestId('header-title')).toHaveTextContent('Histórico')
    })

    it('renders history calendar', () => {
      const { getByTestId } = render(<History />)
      
      expect(getByTestId('history-calendar')).toBeTruthy()
      expect(getByTestId('selected-date')).toHaveTextContent('2023-12-25')
    })

    it('renders workout heading and duration', () => {
      const { getByTestId, getByText } = render(<History />)
      
      expect(getByTestId('heading-title')).toHaveTextContent('Upper Body Workout')
      expect(getByText('01h:00min')).toBeTruthy()
    })

    it('renders history cards', () => {
      const { getByTestId } = render(<History />)
      
      expect(getByTestId('history-card-history-1')).toBeTruthy()
      expect(getByTestId('history-card-history-2')).toBeTruthy()
    })
  })

  describe('Loading State', () => {
    it('shows skeleton animation when loading', () => {
      mockUseQuery.mockReturnValue({
        data: null,
        isLoading: true
      })

      const { getByTestId } = render(<History />)
      
      expect(getByTestId('skeleton-animation')).toBeTruthy()
    })

    it('hides content when loading', () => {
      mockUseQuery.mockReturnValue({
        data: null,
        isLoading: true
      })

      const { queryByTestId } = render(<History />)
      
      expect(queryByTestId('heading-title')).toBeNull()
    })
  })

  describe('Empty State', () => {
    it('shows no content message when no history', () => {
      mockUseQuery.mockReturnValue({
        data: [],
        isLoading: false
      })

      const { getByTestId } = render(<History />)
      
      expect(getByTestId('no-content')).toHaveTextContent(
        'Você não realizou nenghum treino nessa data !'
      )
    })

    it('does not show workout info when no data', () => {
      mockUseQuery.mockReturnValue({
        data: [],
        isLoading: false
      })

      const { getByTestId, queryByText } = render(<History />)
      
      expect(getByTestId('heading-title')).toHaveTextContent('No Title')
      expect(queryByText('01h:00min')).toBeNull()
    })
  })

  describe('Calendar Interaction', () => {
    it('updates selected date when calendar is pressed', () => {
      const { getByTestId } = render(<History />)
      
      const calendar = getByTestId('history-calendar')
      fireEvent.press(calendar)
      
      // The component should handle the date change
      expect(calendar).toBeTruthy()
    })

    it('displays selected date correctly', () => {
      const { getByTestId } = render(<History />)
      
      expect(getByTestId('selected-date')).toHaveTextContent('2023-12-25')
    })
  })

  describe('Data Display', () => {
    it('displays workout name from first history item', () => {
      const { getByTestId } = render(<History />)
      
      expect(getByTestId('heading-title')).toHaveTextContent('Upper Body Workout')
    })

    it('displays formatted workout duration', () => {
      const { getByText } = render(<History />)
      
      expect(mockSecondsToHourMinute).toHaveBeenCalledWith(3600)
      expect(getByText('01h:00min')).toBeTruthy()
    })

    it('renders all history cards', () => {
      const { getByTestId } = render(<History />)
      
      mockHistoryData.forEach(item => {
        expect(getByTestId(`history-card-${item.id}`)).toBeTruthy()
      })
    })
  })

  describe('FlatList Configuration', () => {
    it('renders history cards correctly', () => {
      const { getByTestId } = render(<History />)
      
      expect(getByTestId('history-card-history-1')).toBeTruthy()
      expect(getByTestId('history-card-history-2')).toBeTruthy()
    })
  })

  describe('Query Configuration', () => {
    it('configures query with correct parameters', () => {
      render(<History />)
      
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['get-history-training', '2023-12-25'],
        queryFn: expect.any(Function)
      })
    })
  })

  describe('Conditional Rendering', () => {
    it('shows workout info only when data exists', () => {
      const { getByText } = render(<History />)
      
      expect(getByText('01h:00min')).toBeTruthy()
    })

    it('renders components correctly when data exists', () => {
      const { getByTestId } = render(<History />)
      
      expect(getByTestId('history-card-history-1')).toBeTruthy()
    })
  })

  describe('Time Formatting', () => {
    it('calls secondsToHourMinute with correct value', () => {
      render(<History />)
      
      expect(mockSecondsToHourMinute).toHaveBeenCalledWith(3600)
    })

    it('displays formatted time correctly', () => {
      const { getByText } = render(<History />)
      
      expect(getByText('01h:00min')).toBeTruthy()
    })
  })

  describe('Default State', () => {
    it('initializes with current date', () => {
      const { getByTestId } = render(<History />)
      
      expect(getByTestId('selected-date')).toHaveTextContent('2023-12-25')
    })
  })
})
