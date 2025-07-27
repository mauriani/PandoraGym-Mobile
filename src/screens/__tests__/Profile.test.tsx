import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { Profile } from '../Profile'

// Mock das dependências
jest.mock('@hooks/auth', () => ({
  useAuth: jest.fn()
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}))

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}))

jest.mock('@services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn()
  }
}))

jest.mock('@storage/index', () => ({
  getUserFromStorage: jest.fn(),
  savePlanInStorage: jest.fn()
}))

jest.mock('../../context/DialogAlertContext', () => ({
  useOpenDialogAlert: jest.fn()
}))

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn()
}))

jest.mock('@utils/toast-methods', () => ({
  toast: {
    success: jest.fn(),
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

jest.mock('@components/HeaderGoBack', () => ({
  HeaderGoBack: ({ title }: { title: string }) => {
    const { Text } = require('react-native')
    return <Text testID="header-title">{title}</Text>
  }
}))

jest.mock('@components/ui/Avatar', () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => children,
  AvatarImage: ({ source }: { source: { uri: string } }) => {
    const { Image } = require('react-native')
    return <Image testID="avatar-image" source={source} />
  },
  AvatarFallback: ({ children }: { children: React.ReactNode }) => {
    const { Text } = require('react-native')
    return <Text testID="avatar-fallback">{children}</Text>
  },
  AvatarEditButton: ({ onEditPress }: { onEditPress: () => void }) => {
    const { TouchableOpacity, Text } = require('react-native')
    return (
      <TouchableOpacity testID="avatar-edit-button" onPress={onEditPress}>
        <Text>Edit</Text>
      </TouchableOpacity>
    )
  }
}))

jest.mock('../Profile/__components__/ButtonProfile', () => ({
  ButtonProfile: ({ title, iconName, onPress }: any) => {
    const { TouchableOpacity, Text } = require('react-native')
    return (
      <TouchableOpacity 
        testID={`button-${title.toLowerCase().replace(/\s+/g, '-')}`}
        onPress={onPress}
      >
        <Text>{title}</Text>
        <Text testID="icon-name">{iconName}</Text>
      </TouchableOpacity>
    )
  }
}))

jest.mock('../Profile/__components__/SkeletonAnimation', () => ({
  SkeletonAnimation: () => {
    const { View, Text } = require('react-native')
    return (
      <View testID="skeleton-animation">
        <Text>Loading...</Text>
      </View>
    )
  }
}))

describe('Profile Screen', () => {
  const mockNavigate = jest.fn()
  const mockSignOut = jest.fn()
  const mockOpenDialogAlert = jest.fn()
  const mockRefetch = jest.fn()
  
  const mockUseAuth = require('@hooks/auth').useAuth
  const mockUseNavigation = require('@react-navigation/native').useNavigation
  const mockUseQuery = require('@tanstack/react-query').useQuery
  const mockGetUserFromStorage = require('@storage/index').getUserFromStorage
  const mockUseOpenDialogAlert = require('../../context/DialogAlertContext').useOpenDialogAlert
  const mockLaunchImageLibrary = require('react-native-image-picker').launchImageLibrary
  const mockToast = require('@utils/toast-methods').toast
  const mockApi = require('@services/api').api

  const mockUser = {
    user: {
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com'
    },
    token: 'test-token'
  }

  const mockProfileData = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://example.com/avatar.jpg',
    planName: 'Premium Plan',
    personalId: 'personal-1'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseNavigation.mockReturnValue({ navigate: mockNavigate })
    mockUseAuth.mockReturnValue({ signOut: mockSignOut, user: mockUser })
    mockGetUserFromStorage.mockReturnValue({ id: 'user-1' })
    mockUseOpenDialogAlert.mockReturnValue({ openDialogAlert: mockOpenDialogAlert })
    mockUseQuery.mockReturnValue({
      data: mockProfileData,
      error: null,
      isFetching: false,
      refetch: mockRefetch
    })
  })

  describe('Rendering', () => {
    it('renders all main elements', () => {
      const { getByTestId, getByText } = render(<Profile />)
      
      expect(getByTestId('header-title')).toHaveTextContent('Perfil')
      expect(getByText('John Doe')).toBeTruthy()
      expect(getByText('john@example.com')).toBeTruthy()
      expect(getByText('Premium Plan')).toBeTruthy()
    })

    it('renders avatar with correct image', () => {
      const { getByTestId } = render(<Profile />)
      
      const avatarImage = getByTestId('avatar-image')
      expect(avatarImage.props.source.uri).toBe('https://example.com/avatar.jpg')
    })

    it('renders avatar fallback with initials', () => {
      const { getByTestId } = render(<Profile />)
      
      expect(getByTestId('avatar-fallback')).toHaveTextContent('JD')
    })

    it('renders profile buttons', () => {
      const { getByTestId } = render(<Profile />)
      
      expect(getByTestId('button-meu-personal')).toBeTruthy()
      expect(getByTestId('button-editar-dados-do-perfil')).toBeTruthy()
      expect(getByTestId('button-sair')).toBeTruthy()
    })
  })

  describe('Loading State', () => {
    it('shows skeleton animation when fetching', () => {
      mockUseQuery.mockReturnValue({
        data: null,
        error: null,
        isFetching: true,
        refetch: mockRefetch
      })

      const { getByTestId } = render(<Profile />)
      
      expect(getByTestId('skeleton-animation')).toBeTruthy()
    })

    it('hides content when loading', () => {
      mockUseQuery.mockReturnValue({
        data: null,
        error: null,
        isFetching: true,
        refetch: mockRefetch
      })

      const { queryByText } = render(<Profile />)
      
      expect(queryByText('John Doe')).toBeNull()
    })
  })

  describe('Navigation', () => {
    it('navigates to personal trainer when button is pressed', () => {
      const { getByTestId } = render(<Profile />)
      
      const personalButton = getByTestId('button-meu-personal')
      fireEvent.press(personalButton)
      
      expect(mockNavigate).toHaveBeenCalledWith('personalId', {
        id: 'personal-1'
      })
    })

    it('navigates to edit profile when button is pressed', () => {
      const { getByTestId } = render(<Profile />)
      
      const editButton = getByTestId('button-editar-dados-do-perfil')
      fireEvent.press(editButton)
      
      expect(mockNavigate).toHaveBeenCalledWith('editProfile', {
        user: mockProfileData
      })
    })
  })

  describe('Logout Functionality', () => {
    it('opens dialog alert when logout button is pressed', () => {
      const { getByTestId } = render(<Profile />)
      
      const logoutButton = getByTestId('button-sair')
      fireEvent.press(logoutButton)
      
      expect(mockOpenDialogAlert).toHaveBeenCalledWith({
        title: 'Sair',
        message: 'Você realmente deseja sair do Pandora Gym ?',
        isButtonCancel: true,
        isButtonTitleConfirm: 'Sim, tenho certeza!',
        onConfirm: expect.any(Function)
      })
    })

    it('calls signOut when logout is confirmed', async () => {
      const { getByTestId } = render(<Profile />)
      
      const logoutButton = getByTestId('button-sair')
      fireEvent.press(logoutButton)
      
      // Simulate confirming the dialog
      const onConfirm = mockOpenDialogAlert.mock.calls[0][0].onConfirm
      await onConfirm()
      
      expect(mockSignOut).toHaveBeenCalled()
    })
  })

  describe('Image Selection', () => {
    it('opens image library when avatar edit button is pressed', () => {
      const { getByTestId } = render(<Profile />)
      
      const editButton = getByTestId('avatar-edit-button')
      fireEvent.press(editButton)
      
      expect(mockLaunchImageLibrary).toHaveBeenCalledWith(
        expect.objectContaining({
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          mediaType: 'photo'
        }),
        expect.any(Function)
      )
    })

    it('handles image upload success', async () => {
      mockApi.post.mockResolvedValue({
        status: 200,
        data: { message: 'Avatar updated successfully' }
      })

      const { getByTestId } = render(<Profile />)
      
      const editButton = getByTestId('avatar-edit-button')
      fireEvent.press(editButton)
      
      // Simulate successful image selection
      const callback = mockLaunchImageLibrary.mock.calls[0][1]
      callback({
        assets: [{
          uri: 'file://test-image.jpg',
          type: 'image/jpeg'
        }]
      })
      
      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalledWith('/profile/upload-avatar', expect.any(FormData))
      })
    })
  })

  describe('Conditional Rendering', () => {
    it('does not render personal trainer button when no personalId', () => {
      const dataWithoutPersonal = { ...mockProfileData, personalId: null }
      mockUseQuery.mockReturnValue({
        data: dataWithoutPersonal,
        error: null,
        isFetching: false,
        refetch: mockRefetch
      })

      const { queryByTestId } = render(<Profile />)
      
      expect(queryByTestId('button-meu-personal')).toBeNull()
    })

    it('does not render plan name when not available', () => {
      const dataWithoutPlan = { ...mockProfileData, planName: null }
      mockUseQuery.mockReturnValue({
        data: dataWithoutPlan,
        error: null,
        isFetching: false,
        refetch: mockRefetch
      })

      const { queryByText } = render(<Profile />)
      
      expect(queryByText('Premium Plan')).toBeNull()
    })
  })

  describe('Error Handling', () => {
    it('shows error toast when query fails', async () => {
      const error = new Error('Network error')
      mockUseQuery.mockReturnValue({
        data: null,
        error: error,
        isFetching: false,
        refetch: mockRefetch
      })

      render(<Profile />)
      
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
        isFetching: false,
        refetch: mockRefetch
      })

      render(<Profile />)
      
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('Custom error message')
      })
    })
  })

  describe('Avatar Fallback', () => {
    it('generates correct initials from name', () => {
      const { getByTestId } = render(<Profile />)
      
      expect(getByTestId('avatar-fallback')).toHaveTextContent('JD')
    })

    it('handles single name correctly', () => {
      const singleNameData = { ...mockProfileData, name: 'John' }
      mockUseQuery.mockReturnValue({
        data: singleNameData,
        error: null,
        isFetching: false,
        refetch: mockRefetch
      })

      const { getByTestId } = render(<Profile />)
      
      expect(getByTestId('avatar-fallback')).toHaveTextContent('J')
    })
  })

  describe('Query Configuration', () => {
    it('configures query with correct parameters', () => {
      render(<Profile />)
      
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['get-profile-user-id', 'test-token', 'user-1'],
        queryFn: expect.any(Function)
      })
    })
  })
})
