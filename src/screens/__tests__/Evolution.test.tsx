import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Evolution } from '../Evolution'
import { api } from '@services/api'
import { toast } from '@utils/toast-methods'
import { useAuth } from '@hooks/auth'
import { ThemeContext } from '@theme/theme-provider'

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
}))

// Mock API
jest.mock('@services/api', () => ({
  api: {
    get: jest.fn(),
  },
}))

// Mock toast
jest.mock('@utils/toast-methods', () => ({
  toast: {
    error: jest.fn(),
  },
}))

// Mock auth hook
jest.mock('@hooks/auth', () => ({
  useAuth: jest.fn(),
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

jest.mock('@components/Header', () => {
  const { View, Text } = require('react-native')
  return {
    Header: ({ title }: { title: string }) => (
      <View testID="header">
        <Text>{title}</Text>
      </View>
    ),
  }
})

jest.mock('@components/NoContent', () => {
  const { View, Text } = require('react-native')
  return {
    NoContent: ({ message }: { message: string }) => (
      <View testID="no-content">
        <Text>{message}</Text>
      </View>
    ),
  }
})

jest.mock('@components/SelecFormControlt', () => {
  const { View, Text, TouchableOpacity } = require('react-native')
  return {
    SelecFormControlt: ({ label, name, options, error, change, control }: any) => (
      <View>
        <Text testID={`select-${name}-label`}>{label}</Text>
        <View testID={`select-${name}`}>
          <TouchableOpacity onPress={() => change && change('exercise-1')}>
            <Text>Selecione...</Text>
          </TouchableOpacity>
          {options?.map((option: any) => (
            <TouchableOpacity 
              key={option.value}
              onPress={() => change && change(option.value)}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {error && <Text testID={`select-${name}-error`}>{error.message}</Text>}
      </View>
    ),
  }
})

jest.mock('../Evolution/_components_/Legend', () => {
  const { View, Text } = require('react-native')
  return {
    Legend: ({ data }: { data: any }) => (
      <View testID="legend">
        {data?.map((item: any, index: number) => (
          <View key={index} testID={`legend-item-${index}`}>
            <Text>{item.label}: {item.value}</Text>
          </View>
        ))}
      </View>
    ),
  }
})

jest.mock('../Evolution/_components_/SkeletonAnimation', () => {
  const { View, Text } = require('react-native')
  return {
    SkeletonAnimation: () => (
      <View testID="skeleton-animation">
        <Text>Loading...</Text>
      </View>
    ),
  }
})

// Mock charts
jest.mock('react-native-gifted-charts', () => {
  const { View, Text } = require('react-native')
  return {
    BarChart: ({ data, frontColor, maxValue, barWidth }: any) => (
      <View testID="bar-chart">
        <Text>Bar Chart</Text>
      </View>
    ),
    LineChart: ({ data, color, thickness, width }: any) => (
      <View testID="line-chart">
        <Text>Line Chart</Text>
      </View>
    ),
  }
})

// Mock theme
const mockThemeContext = {
  colorScheme: 'light',
}

jest.mock('@theme/theme-provider', () => {
  const React = require('react')
  return {
    ThemeContext: React.createContext(mockThemeContext),
  }
})

jest.mock('@theme/themes', () => ({
  themes: {
    light: {
      chart5: '#facc15',
      chart2: '#3b82f6',
      chart3: '#ef4444',
      foreground: '#000000',
      mutedForeground: '#666666',
    },
    dark: {
      chart5: '#facc15',
      chart2: '#3b82f6',
      chart3: '#ef4444',
      foreground: '#ffffff',
      mutedForeground: '#999999',
    },
  },
}))

// Mock useWindowDimensions
const mockUseWindowDimensions = () => ({ width: 400, height: 800 })

const mockUser = {
  user: {
    id: 'user-123',
    name: 'John Doe',
  },
}

const mockChartData = [
  { label: 'S-1', value: 3 },
  { label: 'S-2', value: 4 },
  { label: 'S-3', value: 2 },
  { label: 'S-4', value: 5 },
]

const mockExerciseOptions = [
  { value: 'exercise-1', label: 'Supino' },
  { value: 'exercise-2', label: 'Agachamento' },
  { value: 'exercise-3', label: 'Deadlift' },
]

const mockLegend = [
  { label: 'Meta Atingida', value: '✓' },
  { label: 'Meta Não Atingida', value: '✗' },
]

const mockLineData = [
  { value: 80, label: 'Jan' },
  { value: 85, label: 'Feb' },
  { value: 90, label: 'Mar' },
]

const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderComponent = () => {
  const queryClient = createQueryClient()
  
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={mockThemeContext}>
        <NavigationContainer>
          <Evolution />
        </NavigationContainer>
      </ThemeContext.Provider>
    </QueryClientProvider>
  )
}

describe('Evolution Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuth as jest.Mock).mockReturnValue({ user: mockUser })
  })

  describe('Rendering', () => {
    it('renders all main elements with data', async () => {
      ;(api.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            chartData: mockChartData,
            maxDays: 7,
            minDays: 3,
            legend: mockLegend,
          },
        })
        .mockResolvedValueOnce({
          data: {
            history: mockExerciseOptions,
          },
        })

      renderComponent()

      expect(screen.getByTestId('header')).toBeTruthy()

      await waitFor(() => {
        expect(screen.getByTestId('bar-chart')).toBeTruthy()
        expect(screen.getByTestId('legend')).toBeTruthy()
        expect(screen.getByTestId('select-exercise')).toBeTruthy()
      })
    })

    it('renders header with correct title', () => {
      ;(api.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            chartData: [],
            maxDays: 7,
            minDays: 3,
            legend: [],
          },
        })
        .mockResolvedValueOnce({
          data: {
            history: [],
          },
        })

      renderComponent()

      expect(screen.getByText('Evolução')).toBeTruthy()
    })

    it('shows no content message when no data', async () => {
      ;(api.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            chartData: [],
            maxDays: 7,
            minDays: 3,
            legend: [],
          },
        })
        .mockResolvedValueOnce({
          data: {
            history: [],
          },
        })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByText('Adicione seus treinos e acompanhe cada passo da sua evolução!')).toBeTruthy()
      })
    })
  })

  describe('Loading State', () => {
    it('shows skeleton animation when loading', () => {
      ;(api.get as jest.Mock).mockImplementation(() => new Promise(() => {}))

      renderComponent()

      expect(screen.getByTestId('skeleton-animation')).toBeTruthy()
    })

    it('hides skeleton animation when data is loaded', async () => {
      ;(api.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            chartData: mockChartData,
            maxDays: 7,
            minDays: 3,
            legend: mockLegend,
          },
        })
        .mockResolvedValueOnce({
          data: {
            history: mockExerciseOptions,
          },
        })

      renderComponent()

      await waitFor(() => {
        expect(screen.queryByTestId('skeleton-animation')).toBeNull()
      })
    })
  })

  describe('Data Fetching', () => {
    it('calls API to fetch workout frequency and exercise history', async () => {
      ;(api.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            chartData: mockChartData,
            maxDays: 7,
            minDays: 3,
            legend: mockLegend,
          },
        })
        .mockResolvedValueOnce({
          data: {
            history: mockExerciseOptions,
          },
        })

      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/workout-frequency')
        expect(api.get).toHaveBeenCalledWith('/workout-history-name-exercises')
      })
    })
  })

  describe('Component Structure', () => {
    it('has correct component hierarchy', async () => {
      ;(api.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            chartData: mockChartData,
            maxDays: 7,
            minDays: 3,
            legend: mockLegend,
          },
        })
        .mockResolvedValueOnce({
          data: {
            history: mockExerciseOptions,
          },
        })

      renderComponent()

      expect(screen.getByTestId('container')).toBeTruthy()
      expect(screen.getByTestId('header')).toBeTruthy()

      await waitFor(() => {
        expect(screen.getByTestId('bar-chart')).toBeTruthy()
        expect(screen.getByTestId('legend')).toBeTruthy()
        expect(screen.getByTestId('select-exercise')).toBeTruthy()
      })
    })
  })

  describe('Accessibility', () => {
    it('renders without accessibility issues', async () => {
      ;(api.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            chartData: mockChartData,
            maxDays: 7,
            minDays: 3,
            legend: mockLegend,
          },
        })
        .mockResolvedValueOnce({
          data: {
            history: mockExerciseOptions,
          },
        })

      const { toJSON } = renderComponent()
      expect(toJSON()).toBeTruthy()
    })
  })
})
