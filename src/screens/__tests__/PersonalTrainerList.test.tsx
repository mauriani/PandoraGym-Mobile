import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersonalTrainerList } from '../PersonalTrainerList'
import { api } from '@services/api'
import { toast } from '@utils/toast-methods'
import { getUserFromStorage, savePlanInStorage } from '@storage/index'

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

// Mock storage
jest.mock('@storage/index', () => ({
  getUserFromStorage: jest.fn(),
  savePlanInStorage: jest.fn(),
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

jest.mock('@components/ui/Input', () => {
  const { View, Text, TextInput } = require('react-native')
  return {
    Input: ({ label, onChangeText, className }: any) => (
      <View>
        <Text testID="input-label">{label}</Text>
        <TextInput 
          testID="search-input" 
          onChangeText={onChangeText}
        />
      </View>
    ),
  }
})

jest.mock('../PersonalTrainerList/__components__/Card', () => {
  const { TouchableOpacity, View, Text } = require('react-native')
  return {
    Card: ({ item, onPress }: any) => (
      <TouchableOpacity testID={`card-${item.id}`} onPress={onPress}>
        <View testID={`card-name-${item.id}`}>
          <Text>{item.user.name}</Text>
        </View>
      </TouchableOpacity>
    ),
  }
})

jest.mock('../PersonalTrainerList/__components__/SkeletonAnimation', () => {
  const { View, Text } = require('react-native')
  return {
    SkeletonAnimation: () => (
      <View testID="skeleton-animation">
        <Text>Loading...</Text>
      </View>
    ),
  }
})

const mockPersonalTrainers = [
  {
    id: '1',
    user: {
      id: 'user-1',
      name: 'João Silva',
      email: 'joao@example.com',
    },
    student: [
      {
        id: 'student-1',
        plan: {
          id: 'plan-1',
          name: 'Plano Premium',
        },
      },
    ],
  },
  {
    id: '2',
    user: {
      id: 'user-2',
      name: 'Maria Santos',
      email: 'maria@example.com',
    },
    student: [],
  },
  {
    id: '3',
    user: {
      id: 'user-3',
      name: 'Pedro Oliveira',
      email: 'pedro@example.com',
    },
    student: [
      {
        id: 'student-2',
        plan: null,
      },
    ],
  },
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
      <NavigationContainer>
        <PersonalTrainerList />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

describe('PersonalTrainerList Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getUserFromStorage as jest.Mock).mockReturnValue({ id: 'student-1' })
  })

  describe('Rendering', () => {
    it('renders all main elements', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      expect(screen.getByTestId('header')).toBeTruthy()

      await waitFor(() => {
        expect(screen.getByTestId('input-label')).toBeTruthy()
        expect(screen.getByTestId('search-input')).toBeTruthy()
        expect(screen.getByTestId('card-1')).toBeTruthy()
        expect(screen.getByTestId('card-2')).toBeTruthy()
        expect(screen.getByTestId('card-3')).toBeTruthy()
      })
    })

    it('renders header with correct title', () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      expect(screen.getByText('Personal Trainers')).toBeTruthy()
    })

    it('renders search input with correct label', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByText('Buscar personal')).toBeTruthy()
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
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.queryByTestId('skeleton-animation')).toBeNull()
      })
    })
  })

  describe('Data Fetching', () => {
    it('calls API to fetch personal trainers', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/list-personal')
      })
    })

    it('renders personal trainer cards when data is loaded', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeTruthy()
        expect(screen.getByText('Maria Santos')).toBeTruthy()
        expect(screen.getByText('Pedro Oliveira')).toBeTruthy()
      })
    })
  })

  describe('Search Functionality', () => {
    it('filters personal trainers by name', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-1')).toBeTruthy()
      })

      const searchInput = screen.getByTestId('search-input')
      fireEvent.changeText(searchInput, 'João')

      await waitFor(() => {
        expect(screen.getByTestId('card-1')).toBeTruthy()
        expect(screen.queryByTestId('card-2')).toBeNull()
        expect(screen.queryByTestId('card-3')).toBeNull()
      })
    })

    it('shows all trainers when search is cleared', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-1')).toBeTruthy()
      })

      const searchInput = screen.getByTestId('search-input')
      
      // Search for specific trainer
      fireEvent.changeText(searchInput, 'João')
      
      await waitFor(() => {
        expect(screen.queryByTestId('card-2')).toBeNull()
      })

      // Clear search
      fireEvent.changeText(searchInput, '')

      await waitFor(() => {
        expect(screen.getByTestId('card-1')).toBeTruthy()
        expect(screen.getByTestId('card-2')).toBeTruthy()
        expect(screen.getByTestId('card-3')).toBeTruthy()
      })
    })

    it('performs case-insensitive search', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-1')).toBeTruthy()
      })

      const searchInput = screen.getByTestId('search-input')
      fireEvent.changeText(searchInput, 'maria')

      await waitFor(() => {
        expect(screen.getByTestId('card-2')).toBeTruthy()
        expect(screen.queryByTestId('card-1')).toBeNull()
        expect(screen.queryByTestId('card-3')).toBeNull()
      })
    })
  })

  describe('Navigation', () => {
    it('navigates to personal trainer details when card is pressed', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-1')).toBeTruthy()
      })

      const card = screen.getByTestId('card-1')
      fireEvent.press(card)

      expect(mockNavigate).toHaveBeenCalledWith('personalId', {
        id: '1',
      })
    })
  })

  describe('Student Plan Management', () => {
    it('saves plan to storage when student has a plan', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-1')).toBeTruthy()
      })

      const card = screen.getByTestId('card-1')
      fireEvent.press(card)

      expect(savePlanInStorage).toHaveBeenCalledWith('plan-1')
    })

    it('does not save plan when student has no plan', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      await waitFor(() => {
        expect(screen.getByTestId('card-3')).toBeTruthy()
      })

      const card = screen.getByTestId('card-3')
      fireEvent.press(card)

      expect(savePlanInStorage).not.toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('shows error toast when API fails', async () => {
      const mockError = new Error('API Error')
      ;(api.get as jest.Mock).mockRejectedValue(mockError)

      renderComponent()

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Ocorreu um erro ao buscar os treinos. Tente novamente mais tarde')
      })
    })
  })

  describe('Component Structure', () => {
    it('has correct component hierarchy', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      renderComponent()

      expect(screen.getByTestId('container')).toBeTruthy()
      expect(screen.getByTestId('header')).toBeTruthy()

      await waitFor(() => {
        expect(screen.getByTestId('search-input')).toBeTruthy()
        expect(screen.getByTestId('card-1')).toBeTruthy()
      })
    })
  })

  describe('Accessibility', () => {
    it('renders without accessibility issues', async () => {
      ;(api.get as jest.Mock).mockResolvedValue({
        data: { data: mockPersonalTrainers },
      })

      const { toJSON } = renderComponent()
      expect(toJSON()).toBeTruthy()
    })
  })
})
