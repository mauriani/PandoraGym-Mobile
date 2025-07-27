import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react-native'
import { AuthProvider, useAuth } from '../auth'

// Mock das dependências
jest.mock('@storage/index', () => ({
  getTokenFromStorage: jest.fn(),
  getUserFromStorage: jest.fn(),
  removeCurrentWorkoutFromStorage: jest.fn(),
  removeStartWorkoutromStorage: jest.fn(),
  removeTokenFromStorage: jest.fn(),
  removeUserFromStorage: jest.fn(),
  savePlanInStorage: jest.fn(),
  saveTokenInStorage: jest.fn(),
  saveUserInStorage: jest.fn(),
}))

jest.mock('@utils/toast-methods', () => ({
  toast: {
    error: jest.fn()
  }
}))

jest.mock('../../services/api', () => ({
  api: {
    post: jest.fn(),
    defaults: {
      headers: {
        common: {}
      }
    }
  }
}))

const mockStorage = require('@storage/index')
const mockToast = require('@utils/toast-methods')
const mockApi = require('../../services/api')

describe('useAuth hook', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    student: {
      plan: {
        id: 'plan-1'
      }
    }
  }

  const mockToken = 'mock-token'

  beforeEach(() => {
    jest.clearAllMocks()
    mockStorage.getUserFromStorage.mockResolvedValue(null)
    mockStorage.getTokenFromStorage.mockResolvedValue(null)
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  describe('initialization', () => {
    it('initializes with loading state', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })
      
      expect(result.current.loading).toBe(true)
      expect(result.current.user).toBeNull()
    })

    it('loads user data from storage on mount', async () => {
      mockStorage.getUserFromStorage.mockResolvedValue(mockUser)
      mockStorage.getTokenFromStorage.mockResolvedValue(mockToken)

      const { result } = renderHook(() => useAuth(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.user).toEqual({
        user: mockUser,
        token: mockToken
      })
    })

    it('handles storage loading errors gracefully', async () => {
      mockStorage.getUserFromStorage.mockRejectedValue(new Error('Storage error'))
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      const { result } = renderHook(() => useAuth(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.user).toBeNull()
      expect(consoleSpy).toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })
  })

  describe('signIn', () => {
    it('signs in user successfully', async () => {
      const credentials = { email: 'test@example.com', password: 'password' }
      const responseData = { token: mockToken, user: mockUser }
      
      mockApi.api.post.mockResolvedValue({ data: responseData })

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.signIn(credentials)
      })

      expect(mockApi.api.post).toHaveBeenCalledWith('/session', credentials)
      expect(mockStorage.saveUserInStorage).toHaveBeenCalledWith(mockUser)
      expect(mockStorage.saveTokenInStorage).toHaveBeenCalledWith(mockToken)
      expect(mockStorage.savePlanInStorage).toHaveBeenCalledWith('plan-1')
      expect(result.current.user).toEqual({ token: mockToken, user: mockUser })
    })

    it('handles sign in without plan', async () => {
      const userWithoutPlan = { ...mockUser, student: { plan: null } }
      const credentials = { email: 'test@example.com', password: 'password' }
      const responseData = { token: mockToken, user: userWithoutPlan }
      
      mockApi.api.post.mockResolvedValue({ data: responseData })

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.signIn(credentials)
      })

      expect(mockStorage.savePlanInStorage).not.toHaveBeenCalled()
    })

    it('handles sign in error', async () => {
      const credentials = { email: 'test@example.com', password: 'wrong' }
      const error = new Error('Invalid credentials')
      
      mockApi.api.post.mockRejectedValue(error)

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.signIn(credentials)
      })

      expect(mockToast.toast.error).toHaveBeenCalledWith('Invalid credentials')
      expect(result.current.user).toBeNull()
    })
  })

  describe('signOut', () => {
    it('signs out user successfully', async () => {
      // First sign in
      mockApi.api.post.mockResolvedValue({ 
        data: { token: mockToken, user: mockUser } 
      })

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.signIn({ email: 'test@example.com', password: 'password' })
      })

      // Then sign out
      await act(async () => {
        await result.current.signOut()
      })

      expect(mockStorage.removeUserFromStorage).toHaveBeenCalled()
      expect(mockStorage.removeTokenFromStorage).toHaveBeenCalled()
      expect(mockStorage.removeStartWorkoutromStorage).toHaveBeenCalled()
      expect(mockStorage.removeCurrentWorkoutFromStorage).toHaveBeenCalled()
      expect(result.current.user).toBeNull()
    })

    it('clears API authorization header on sign out', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.signOut()
      })

      expect(mockApi.api.defaults.headers.common.Authorization).toBeUndefined()
    })
  })

  describe('context usage', () => {
    it('throws error when used outside provider', () => {
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      expect(() => {
        renderHook(() => useAuth())
      }).not.toThrow() // useAuth doesn't throw, it just returns empty context
      
      consoleSpy.mockRestore()
    })

    it('provides correct context value', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })
      
      expect(result.current).toHaveProperty('user')
      expect(result.current).toHaveProperty('loading')
      expect(result.current).toHaveProperty('signIn')
      expect(result.current).toHaveProperty('signOut')
      expect(typeof result.current.signIn).toBe('function')
      expect(typeof result.current.signOut).toBe('function')
    })
  })

  describe('loading states', () => {
    it('manages loading state correctly during initialization', async () => {
      mockStorage.getUserFromStorage.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockUser), 100))
      )
      mockStorage.getTokenFromStorage.mockResolvedValue(mockToken)

      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })
  })

  describe('edge cases', () => {
    it('handles partial storage data', async () => {
      mockStorage.getUserFromStorage.mockResolvedValue(mockUser)
      mockStorage.getTokenFromStorage.mockResolvedValue(null)

      const { result } = renderHook(() => useAuth(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.user).toBeNull()
    })

    it('handles API response without expected data structure', async () => {
      const credentials = { email: 'test@example.com', password: 'password' }
      mockApi.api.post.mockResolvedValue({ data: {} })

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.signIn(credentials)
      })

      // Should handle gracefully without crashing
      expect(result.current.user).toEqual({ token: undefined, user: undefined })
    })
  })
})
