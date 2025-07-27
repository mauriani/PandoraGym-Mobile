import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { Home } from '../Home'

// Mock das dependências
jest.mock('@hooks/auth', () => ({
  useAuth: jest.fn()
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}))

jest.mock('@react-navigation/bottom-tabs', () => ({
  useBottomTabBarHeight: jest.fn()
}))

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}))

jest.mock('@services/api', () => ({
  api: {
    get: jest.fn()
  }
}))

jest.mock('@storage/index', () => ({
  saveBottomBarStorage: jest.fn()
}))

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn()
}))

jest.mock('@utils/toast-methods', () => ({
  toast: {
    error: jest.fn()
  }
}))

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
    return <Text testID={`heading-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</Text>
  }
}))

jest.mock('@components/InputWithButton', () => ({
  InputWithButton: ({ label, iconName, onNavigate }: any) => {
    const { TouchableOpacity, Text } = require('react-native')
    return (
      <TouchableOpacity 
        testID="input-with-button"
        onPress={() => onNavigate && onNavigate('Test Training')}
      >
        <Text>{label}</Text>
        <Text testID="icon-name">{iconName}</Text>
      </TouchableOpacity>
    )
  }
}))

jest.mock('@components/MyTrainingCard', () => ({
  MyTrainingCard: ({ item, onAccessTraining }: any) => {
    const { TouchableOpacity, Text } = require('react-native')
    return (
      <TouchableOpacity 
        testID={`training-card-${item.id}`}
        onPress={onAccessTraining}
      >
        <Text>{item.name}</Text>
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

jest.mock('../Home/__components__/SkeletonAnimation', () => ({
  SkeletonAnimation: () => {
    const { View, Text } = require('react-native')
    return (
      <View testID="skeleton-animation">
        <Text>Loading...</Text>
      </View>
    )
  }
}))

describe('Home Screen', () => {
  const mockNavigate = jest.fn()
  const mockUseAuth = require('@hooks/auth').useAuth
  const mockUseNavigation = require('@react-navigation/native').useNavigation
  const mockUseBottomTabBarHeight = require('@react-navigation/bottom-tabs').useBottomTabBarHeight
  const mockUseQuery = require('@tanstack/react-query').useQuery
  const mockSaveBottomBarStorage = require('@storage/index').saveBottomBarStorage
  const mockSplashScreen = require('react-native-splash-screen')
  const mockToast = require('@utils/toast-methods').toast

  const mockUser = {
    user: {
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com'
    }
  }

  const mockTrainings = [
    {
      id: 'training-1',
      name: 'Upper Body Workout',
      exclusive: false,
      weekDays: ['Segunda', 'Quarta', 'Sexta']
    },
    {
      id: 'training-2',
      name: 'Lower Body Workout',
      exclusive: true,
      weekDays: ['Terça', 'Quinta']
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseNavigation.mockReturnValue({ navigate: mockNavigate })
    mockUseAuth.mockReturnValue({ user: mockUser })
    mockUseBottomTabBarHeight.mockReturnValue(80)
    mockUseQuery.mockReturnValue({
      data: mockTrainings,
      error: null,
      isFetching: false
    })
  })

  describe('Rendering', () => {
    it('renders all main elements', () => {
      const { getByTestId } = render(<Home />)
      
      expect(getByTestId('header-title')).toHaveTextContent('Meus Treinos')
      expect(getByTestId('heading-criar-treino')).toHaveTextContent('Criar Treino')
      expect(getByTestId('heading-meus-treinos')).toHaveTextContent('Meus Treinos')
      expect(getByTestId('input-with-button')).toBeTruthy()
    })

    it('renders input with button with correct props', () => {
      const { getByTestId } = render(<Home />)
      
      expect(getByTestId('input-with-button')).toBeTruthy()
      expect(getByTestId('icon-name')).toHaveTextContent('Plus')
    })

    it('renders training cards when data is available', () => {
      const { getByTestId } = render(<Home />)
      
      expect(getByTestId('training-card-training-1')).toBeTruthy()
      expect(getByTestId('training-card-training-2')).toBeTruthy()
    })
  })

  describe('Loading State', () => {
    it('shows skeleton animation when fetching', () => {
      mockUseQuery.mockReturnValue({
        data: null,
        error: null,
        isFetching: true
      })

      const { getByTestId } = render(<Home />)
      
      expect(getByTestId('skeleton-animation')).toBeTruthy()
    })

    it('hides content when loading', () => {
      mockUseQuery.mockReturnValue({
        data: null,
        error: null,
        isFetching: true
      })

      const { queryByTestId } = render(<Home />)
      
      expect(queryByTestId('heading-criar-treino')).toBeNull()
      expect(queryByTestId('input-with-button')).toBeNull()
    })
  })

  describe('Empty State', () => {
    it('shows no content message when no trainings', () => {
      mockUseQuery.mockReturnValue({
        data: [],
        error: null,
        isFetching: false
      })

      const { getByTestId } = render(<Home />)
      
      expect(getByTestId('no-content')).toHaveTextContent(
        'Opss ... você não tem nenhum treino cadastrado até o momento!'
      )
    })
  })

  describe('Navigation', () => {
    it('navigates to create training when input button is pressed', () => {
      const { getByTestId } = render(<Home />)
      
      const inputButton = getByTestId('input-with-button')
      fireEvent.press(inputButton)
      
      expect(mockNavigate).toHaveBeenCalledWith('createTrainingFirstStep', {
        title: 'Test Training'
      })
    })

    it('navigates to start training when training card is pressed', () => {
      const { getByTestId } = render(<Home />)
      
      const trainingCard = getByTestId('training-card-training-1')
      fireEvent.press(trainingCard)
      
      expect(mockNavigate).toHaveBeenCalledWith('startTraining', {
        id: 'training-1',
        name: 'Upper Body Workout',
        exclusive: false,
        weekDays: ['Segunda', 'Quarta', 'Sexta']
      })
    })
  })

  describe('Error Handling', () => {
    it('shows error toast when query fails', async () => {
      const error = new Error('Network error')
      mockUseQuery.mockReturnValue({
        data: null,
        error: error,
        isFetching: false
      })

      render(<Home />)
      
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          'Ocorreu um erro ao buscar os treinos. Tente novamente mais tarde'
        )
      })
    })

    it('handles AppError correctly', async () => {
      const AppError = require('@utils/AppError').AppError
      const appError = new AppError('Custom error message')
      mockUseQuery.mockReturnValue({
        data: null,
        error: appError,
        isFetching: false
      })

      render(<Home />)
      
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('Custom error message')
      })
    })
  })

  describe('Lifecycle', () => {
    it('saves bottom bar height on mount', () => {
      render(<Home />)
      
      expect(mockSaveBottomBarStorage).toHaveBeenCalledWith(80)
    })

    it('hides splash screen on mount', () => {
      render(<Home />)
      
      expect(mockSplashScreen.hide).toHaveBeenCalled()
    })
  })

  describe('Query Configuration', () => {
    it('configures query with correct parameters', () => {
      render(<Home />)
      
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['get-training-for-user', 'user-1'],
        queryFn: expect.any(Function)
      })
    })
  })

  describe('UI Interactions', () => {
    it('renders main UI components', () => {
      const { getByTestId } = render(<Home />)
      
      expect(getByTestId('header-title')).toBeTruthy()
      expect(getByTestId('input-with-button')).toBeTruthy()
    })
  })

  describe('Data Handling', () => {
    it('handles multiple training items', () => {
      const { getByTestId } = render(<Home />)
      
      mockTrainings.forEach(training => {
        expect(getByTestId(`training-card-${training.id}`)).toBeTruthy()
      })
    })

    it('passes correct props to training cards', () => {
      const { getByTestId } = render(<Home />)
      
      const firstCard = getByTestId('training-card-training-1')
      expect(firstCard).toHaveTextContent('Upper Body Workout')
    })
  })

  describe('Accessibility', () => {
    it('renders accessible components', () => {
      const { getByTestId } = render(<Home />)
      
      expect(getByTestId('header-title')).toBeTruthy()
      expect(getByTestId('input-with-button')).toBeTruthy()
    })
  })
})
