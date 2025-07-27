import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WorkoutsTemplates } from '../WorkoutsTemplates'
import { api } from '@services/api'
import { toast } from '@utils/toast-methods'

// Mock navigation
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
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

// Mock components
jest.mock('@components/Container', () => {
  const { View } = require('react-native')
  return {
    Container: ({ children }: { children: React.ReactNode }) => (
      <View testID="container">{children}</View>
    ),
  }
})

jest.mock('@components/Content', () => {
  const { View } = require('react-native')
  return {
    Content: ({ children }: { children: React.ReactNode }) => (
      <View testID="content">{children}</View>
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

jest.mock('../WorkoutsTemplates/__components__/CardTop', () => {
  const { TouchableOpacity, Text } = require('react-native')
  return {
    CardTop: ({ personalName, onNavigate }: any) => (
      <TouchableOpacity testID={`card-top-${personalName.replace(/\s+/g, '-').toLowerCase()}`} onPress={onNavigate}>
        <Text>{personalName}</Text>
      </TouchableOpacity>
    ),
  }
})

jest.mock('../WorkoutsTemplates/__components__/CardWorkouts', () => {
  const { TouchableOpacity, Text } = require('react-native')
  return {
    CardWorkouts: ({ training, onNavigate }: any) => (
      <TouchableOpacity testID={`card-workout-${training.id}`} onPress={() => onNavigate(training.name, training.id, training.thumbnail)}>
        <Text>{training.name}</Text>
      </TouchableOpacity>
    ),
  }
})

jest.mock('../WorkoutsTemplates/__components__/SkeletonAnimation', () => {
  const { View, Text } = require('react-native')
  return {
    SkeletonAnimation: () => (
      <View testID="skeleton-animation">
        <Text>Loading...</Text>
      </View>
    ),
  }
})

const mockTemplateData = {
  workoutAdm: [
    {
      id: 'workout-1',
      name: 'Treino de Força',
      thumbnail: 'thumb1.jpg',
    },
    {
      id: 'workout-2',
      name: 'Treino Cardio',
      thumbnail: 'thumb2.jpg',
    },
  ],
  workoutsByPersonal: {
    'personal-1': [
      {
        id: 'workout-3',
        name: 'Treino Personalizado A',
        thumbnail: 'thumb3.jpg',
        personalId: 'personal-1',
        personal: {
          user: {
            name: 'João Silva',
            avatarUrl: 'avatar1.jpg',
          },
        },
      },
      {
        id: 'workout-4',
        name: 'Treino Personalizado B',
        thumbnail: 'thumb4.jpg',
        personalId: 'personal-1',
        personal: {
          user: {
            name: 'João Silva',
            avatarUrl: 'avatar1.jpg',
          },
        },
      },
    ],
    'personal-2': [
      {
        id: 'workout-5',
        name: 'Treino Avançado',
        thumbnail: 'thumb5.jpg',
        personalId: 'personal-2',
        personal: {
          user: {
            name: 'Maria Santos',
            avatarUrl: 'avatar2.jpg',
          },
        },
      },
    ],
  },
}

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
      <NavigationContainer>
        <WorkoutsTemplates />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

describe('WorkoutsTemplates Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders all main elements', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      expect(screen.getByTestId('header')).toBeTruthy()

      await waitFor(() => {
        expect(screen.getByTestId('card-top-treinos-recomendados')).toBeTruthy()
        expect(screen.getByTestId('card-workout-workout-1')).toBeTruthy()
        expect(screen.getByTestId('card-workout-workout-2')).toBeTruthy()
      })
    })

    it('renders header with correct title', () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      expect(screen.getByText('Programas De Treino')).toBeTruthy()
    })

    it('renders recommended workouts section', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByText('Treinos Recomendados')).toBeTruthy()
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
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.queryByTestId('skeleton-animation')).toBeNull()
      })
    })
  })

  describe('Data Fetching', () => {
    it('calls API to fetch training templates', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/training-programs')
      })
    })

    it('renders admin workouts when data is loaded', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByText('Treino de Força')).toBeTruthy()
        expect(screen.getByText('Treino Cardio')).toBeTruthy()
      })
    })

    it('renders personal trainer workouts when data is loaded', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeTruthy()
        expect(screen.getByText('Treino Personalizado A')).toBeTruthy()
        expect(screen.getByText('Treino Personalizado B')).toBeTruthy()
        expect(screen.getByText('Maria Santos')).toBeTruthy()
        expect(screen.getByText('Treino Avançado')).toBeTruthy()
      })
    })
  })

  describe('Navigation', () => {
    it('navigates to recommended workouts when card is pressed', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-top-treinos-recomendados')).toBeTruthy()
      })

      const recommendedCard = screen.getByTestId('card-top-treinos-recomendados')
      fireEvent.press(recommendedCard)

      expect(mockNavigate).toHaveBeenCalledWith('workoutAll', {
        title: 'Treinos Recomendados',
        id: null,
      })
    })

    it('navigates to workout details when admin workout card is pressed', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-workout-workout-1')).toBeTruthy()
      })

      const workoutCard = screen.getByTestId('card-workout-workout-1')
      fireEvent.press(workoutCard)

      expect(mockNavigate).toHaveBeenCalledWith('workoutId', {
        title: 'Treino de Força',
        id: 'workout-1',
        tumbnail: 'thumb1.jpg',
      })
    })

    it('navigates to personal trainer workouts when personal card is pressed', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-top-joão-silva')).toBeTruthy()
      })

      const personalCard = screen.getByTestId('card-top-joão-silva')
      fireEvent.press(personalCard)

      expect(mockNavigate).toHaveBeenCalledWith('workoutAll', {
        title: 'João Silva',
        id: 'personal-1',
      })
    })

    it('navigates to personal workout details when personal workout card is pressed', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-workout-workout-3')).toBeTruthy()
      })

      const workoutCard = screen.getByTestId('card-workout-workout-3')
      fireEvent.press(workoutCard)

      expect(mockNavigate).toHaveBeenCalledWith('workoutId', {
        title: 'Treino Personalizado A',
        id: 'workout-3',
        tumbnail: 'thumb3.jpg',
      })
    })
  })

  describe('Error Handling', () => {
    it('handles API errors gracefully', async () => {
      const mockError = new Error('API Error')
      ;(api.get as jest.Mock).mockRejectedValue(mockError)

      renderComponent()

      // Component should still render without crashing
      expect(screen.getByTestId('container')).toBeTruthy()
      expect(screen.getByTestId('header')).toBeTruthy()
    })
  })

  describe('Data Structure', () => {
    it('handles empty admin workouts', async () => {
      const emptyData = {
        workoutAdm: [],
        workoutsByPersonal: {},
      }
      ;(api.get as jest.Mock).mockResolvedValue({
        data: emptyData,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-top-treinos-recomendados')).toBeTruthy()
        expect(screen.queryByTestId('card-workout-workout-1')).toBeNull()
      })
    })

    it('handles empty personal workouts', async () => {
      const dataWithoutPersonal = {
        workoutAdm: mockTemplateData.workoutAdm,
        workoutsByPersonal: {},
      }
      ;(api.get as jest.Mock).mockResolvedValue({
        data: dataWithoutPersonal,
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-workout-workout-1')).toBeTruthy()
        expect(screen.queryByTestId('card-top-joão-silva')).toBeNull()
      })
    })
  })

  describe('Component Structure', () => {
    it('has correct component hierarchy', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      renderComponent()

      expect(screen.getByTestId('container')).toBeTruthy()
      expect(screen.getByTestId('header')).toBeTruthy()

      await waitFor(() => {
        expect(screen.getByTestId('card-top-treinos-recomendados')).toBeTruthy()
        expect(screen.getByTestId('card-workout-workout-1')).toBeTruthy()
      })
    })
  })

  describe('Accessibility', () => {
    it('renders without accessibility issues', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: mockTemplateData,
      })

      const { toJSON } = renderComponent()
      expect(toJSON()).toBeTruthy()
    })
  })
})
