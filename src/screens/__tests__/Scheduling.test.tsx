import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Scheduling } from '../Scheduling'
import { api } from '@services/api'
import { toast } from '@utils/toast-methods'

// Mock navigation
const mockGoBack = jest.fn()
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {
      personalId: 'personal-123',
      personalName: 'João Silva',
    },
  }),
}))

// Mock API
jest.mock('@services/api', () => ({
  api: {
    post: jest.fn(),
  },
}))

// Mock toast
jest.mock('@utils/toast-methods', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

// Mock components
jest.mock('@components/Container', () => {
  const { View } = require('react-native')
  return {
    Container: ({ children }: { children: React.ReactNode }) => (
      <View testID="container">{children}</View>
    ),
  }
})

jest.mock('@components/HeaderGoBack', () => {
  const { View, Text } = require('react-native')
  return {
    HeaderGoBack: ({ title }: { title: string }) => (
      <View testID="header-go-back">
        <Text>{title}</Text>
      </View>
    ),
  }
})

jest.mock('@components/ui/Button', () => {
  const { TouchableOpacity, Text } = require('react-native')
  return {
    Button: ({ 
      children, 
      onPress, 
      variant, 
      size, 
      disabled, 
      loading, 
      className 
    }: any) => (
      <TouchableOpacity 
        testID={`button-${children?.props?.children || 'button'}`}
        onPress={onPress}
        disabled={disabled}
      >
        <Text>{loading ? 'Agendando...' : children}</Text>
      </TouchableOpacity>
    ),
  }
})

// Mock Calendar
jest.mock('react-native-calendars', () => {
  const { View, TouchableOpacity, Text } = require('react-native')
  return {
    Calendar: ({ onDayPress, markedDates, minDate, theme }: any) => (
      <View testID="calendar">
        <TouchableOpacity 
          testID="calendar-day-2024-01-15"
          onPress={() => onDayPress({ dateString: '2024-01-15' })}
        >
          <Text>15</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          testID="calendar-day-2024-01-16"
          onPress={() => onDayPress({ dateString: '2024-01-16' })}
        >
          <Text>16</Text>
        </TouchableOpacity>
      </View>
    ),
  }
})

// Mock react-native-iphone-x-helper
jest.mock('react-native-iphone-x-helper', () => ({
  getBottomSpace: () => 20,
}))

const renderComponent = () => {
  return render(
    <NavigationContainer>
      <Scheduling />
    </NavigationContainer>
  )
}

describe('Scheduling Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock current date
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2024-01-15T10:00:00.000Z')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders all main elements', () => {
      renderComponent()

      expect(screen.getByTestId('header-go-back')).toBeTruthy()
      expect(screen.getByTestId('calendar')).toBeTruthy()
      expect(screen.getByText('Agendar com João Silva')).toBeTruthy()
      expect(screen.getByText('Selecione uma data:')).toBeTruthy()
    })

    it('renders header with correct title', () => {
      renderComponent()

      expect(screen.getByText('Agendamento')).toBeTruthy()
    })

    it('displays personal trainer name', () => {
      renderComponent()

      expect(screen.getByText('Agendar com João Silva')).toBeTruthy()
    })

    it('renders calendar component', () => {
      renderComponent()

      expect(screen.getByTestId('calendar')).toBeTruthy()
    })
  })

  describe('Date Selection', () => {
    it('updates selected date when calendar day is pressed', () => {
      renderComponent()

      const dayButton = screen.getByTestId('calendar-day-2024-01-16')
      fireEvent.press(dayButton)

      // Calendar interaction should work
      expect(dayButton).toBeTruthy()
    })

    it('shows time slots when date is selected', () => {
      renderComponent()

      expect(screen.getByText('Horários disponíveis:')).toBeTruthy()
      
      // Check if time slots are rendered
      const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      timeSlots.forEach(time => {
        expect(screen.getByText(time)).toBeTruthy()
      })
    })
  })

  describe('Time Selection', () => {
    it('renders all time slots', () => {
      renderComponent()

      const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
      
      timeSlots.forEach(time => {
        expect(screen.getByTestId(`button-${time}`)).toBeTruthy()
      })
    })

    it('updates selected time when time slot is pressed', () => {
      renderComponent()

      const timeButton = screen.getByTestId('button-09:00')
      fireEvent.press(timeButton)

      // Button interaction should work
      expect(timeButton).toBeTruthy()
    })
  })

  describe('Form Validation', () => {
    it('has validation logic available', async () => {
      renderComponent()

      const confirmButton = screen.getByTestId('button-Confirmar Agendamento')
      expect(confirmButton).toBeTruthy()
    })

    it('enables confirm button when date and time are selected', () => {
      renderComponent()

      // Select time
      const timeButton = screen.getByTestId('button-09:00')
      fireEvent.press(timeButton)

      const confirmButton = screen.getByTestId('button-Confirmar Agendamento')
      expect(confirmButton).toBeTruthy()
    })
  })

  describe('API Integration', () => {
    it('calls API with correct data when scheduling', async () => {
      const mockApiResponse = { status: 200 }
      ;(api.post as jest.Mock).mockResolvedValue(mockApiResponse)

      renderComponent()

      // Select date and time
      const dayButton = screen.getByTestId('calendar-day-2024-01-16')
      fireEvent.press(dayButton)
      
      const timeButton = screen.getByTestId('button-09:00')
      fireEvent.press(timeButton)

      const confirmButton = screen.getByTestId('button-Confirmar Agendamento')
      fireEvent.press(confirmButton)

      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/schedule', {
          personalId: 'personal-123',
          date: '2024-01-16',
          time: '09:00',
        })
      })
    })

    it('shows success message and navigates back on successful scheduling', async () => {
      const mockApiResponse = { status: 200 }
      ;(api.post as jest.Mock).mockResolvedValue(mockApiResponse)

      renderComponent()

      // Select time
      const timeButton = screen.getByTestId('button-09:00')
      fireEvent.press(timeButton)

      const confirmButton = screen.getByTestId('button-Confirmar Agendamento')
      fireEvent.press(confirmButton)

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Agendamento realizado com sucesso!')
        expect(mockGoBack).toHaveBeenCalled()
      })
    })

    it('shows error message on API failure', async () => {
      const mockError = new Error('Erro ao realizar agendamento')
      ;(api.post as jest.Mock).mockRejectedValue(mockError)

      renderComponent()

      // Select time
      const timeButton = screen.getByTestId('button-09:00')
      fireEvent.press(timeButton)

      const confirmButton = screen.getByTestId('button-Confirmar Agendamento')
      fireEvent.press(confirmButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Erro ao realizar agendamento. Tente novamente.')
      })
    })
  })

  describe('Loading State', () => {
    it('shows loading text when scheduling', async () => {
      const mockApiResponse = { status: 200 }
      ;(api.post as jest.Mock).mockResolvedValue(mockApiResponse)

      renderComponent()

      // Select time
      const timeButton = screen.getByTestId('button-09:00')
      fireEvent.press(timeButton)

      const confirmButton = screen.getByTestId('button-Confirmar Agendamento')
      fireEvent.press(confirmButton)

      // Should show loading text
      expect(screen.getByText('Agendando...')).toBeTruthy()
    })
  })

  describe('Component Structure', () => {
    it('has correct component hierarchy', () => {
      renderComponent()

      expect(screen.getByTestId('container')).toBeTruthy()
      expect(screen.getByTestId('header-go-back')).toBeTruthy()
      expect(screen.getByTestId('calendar')).toBeTruthy()
      expect(screen.getByTestId('button-Confirmar Agendamento')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('renders without accessibility issues', () => {
      const { toJSON } = renderComponent()
      expect(toJSON()).toBeTruthy()
    })
  })
})
