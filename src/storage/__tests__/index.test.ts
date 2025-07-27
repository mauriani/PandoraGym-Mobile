import {
  saveUserInStorage,
  saveTokenInStorage,
  savePlanInStorage,
  saveStartWorkoutStorage,
  saveBottomBarStorage,
  saveCurrentWorkoutStorage,
  getUserFromStorage,
  getTokenFromStorage,
  getTokenPlanStorage,
  getStartWorkoutStorage,
  getBottomBarStorage,
  getCurrentWorkoutStorage,
  removeUserFromStorage,
  removeTokenFromStorage,
  removeCurrentWorkoutFromStorage,
  removeStartWorkoutromStorage,
  storage,
  USER_STORAGE_KEY,
  USER_STORAGE_TOKEN,
  USER_STORAGE_PLAN,
  USER_START_WORKOUT_STORAGE,
  USER_STORAGE_TABBAR,
  USER_STORAGE_CURRENTWORKOUT,
} from '../index'

// Mock do MMKV
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    delete: jest.fn(),
  })),
}))

describe('Storage functions', () => {
  const mockStorage = storage as jest.Mocked<typeof storage>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('constants', () => {
    it('has correct storage keys', () => {
      expect(USER_STORAGE_KEY).toBe('@pandora:user')
      expect(USER_STORAGE_TOKEN).toBe('@pandora:token')
      expect(USER_STORAGE_PLAN).toBe('@pandora:plan')
      expect(USER_START_WORKOUT_STORAGE).toBe('@pandora:startworkout')
      expect(USER_STORAGE_TABBAR).toBe('@pandora:bottom')
      expect(USER_STORAGE_CURRENTWORKOUT).toBe('@pandora:currentworkout')
    })
  })

  describe('save functions', () => {
    describe('saveUserInStorage', () => {
      it('saves user data to storage', () => {
        const mockUser = {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
        }

        saveUserInStorage(mockUser)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_STORAGE_KEY,
          JSON.stringify(mockUser),
        )
      })
    })

    describe('saveTokenInStorage', () => {
      it('saves token to storage', () => {
        const token = 'test-token-123'

        saveTokenInStorage(token)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_STORAGE_TOKEN,
          JSON.stringify(token),
        )
      })
    })

    describe('savePlanInStorage', () => {
      it('saves plan to storage', () => {
        const plan = 'premium-plan'

        savePlanInStorage(plan)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_STORAGE_PLAN,
          JSON.stringify(plan),
        )
      })

      it('saves null plan to storage', () => {
        savePlanInStorage(null)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_STORAGE_PLAN,
          JSON.stringify(null),
        )
      })
    })

    describe('saveStartWorkoutStorage', () => {
      it('saves date object to storage', () => {
        const date = new Date('2023-12-25T10:00:00Z')

        saveStartWorkoutStorage(date)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_START_WORKOUT_STORAGE,
          JSON.stringify(date),
        )
      })

      it('saves date string to storage', () => {
        const dateString = '2023-12-25T10:00:00Z'

        saveStartWorkoutStorage(dateString)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_START_WORKOUT_STORAGE,
          JSON.stringify(dateString),
        )
      })

      it('saves null to storage', () => {
        saveStartWorkoutStorage(null)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_START_WORKOUT_STORAGE,
          JSON.stringify(null),
        )
      })
    })

    describe('saveBottomBarStorage', () => {
      it('saves bottom bar height to storage', () => {
        const height = 80

        saveBottomBarStorage(height)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_STORAGE_TABBAR,
          JSON.stringify(height),
        )
      })

      it('saves null to storage', () => {
        saveBottomBarStorage(null)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_STORAGE_TABBAR,
          JSON.stringify(null),
        )
      })
    })

    describe('saveCurrentWorkoutStorage', () => {
      it('saves current workout to storage', () => {
        const workout = {
          id: 'workout-1',
          name: 'Test Workout',
          exercise: {
            id: 'exercise-1',
            name: 'Push Up',
          },
        }

        saveCurrentWorkoutStorage(workout)

        expect(mockStorage.set).toHaveBeenCalledWith(
          USER_STORAGE_CURRENTWORKOUT,
          JSON.stringify(workout),
        )
      })
    })
  })

  describe('get functions', () => {
    describe('getUserFromStorage', () => {
      it('returns user data from storage', () => {
        const mockUser = {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
        }

        mockStorage.getString.mockReturnValue(JSON.stringify(mockUser))

        const result = getUserFromStorage()

        expect(mockStorage.getString).toHaveBeenCalledWith(USER_STORAGE_KEY)
        expect(result).toEqual(mockUser)
      })

      it('returns null when no user data exists', () => {
        mockStorage.getString.mockReturnValue(undefined)

        const result = getUserFromStorage()

        expect(result).toBeNull()
      })

      it('handles invalid JSON gracefully', () => {
        mockStorage.getString.mockReturnValue('invalid-json')

        expect(() => getUserFromStorage()).toThrow()
      })
    })

    describe('getTokenFromStorage', () => {
      it('returns token from storage', () => {
        const token = 'test-token-123'

        mockStorage.getString.mockReturnValue(JSON.stringify(token))

        const result = getTokenFromStorage()

        expect(mockStorage.getString).toHaveBeenCalledWith(USER_STORAGE_TOKEN)
        expect(result).toBe(token)
      })

      it('returns null when no token exists', () => {
        mockStorage.getString.mockReturnValue(undefined)

        const result = getTokenFromStorage()

        expect(result).toBeNull()
      })
    })

    describe('getTokenPlanStorage', () => {
      it('returns plan from storage', () => {
        const plan = 'premium-plan'

        mockStorage.getString.mockReturnValue(JSON.stringify(plan))

        const result = getTokenPlanStorage()

        expect(mockStorage.getString).toHaveBeenCalledWith(USER_STORAGE_PLAN)
        expect(result).toBe(plan)
      })

      it('returns null when no plan exists', () => {
        mockStorage.getString.mockReturnValue(undefined)

        const result = getTokenPlanStorage()

        expect(result).toBeNull()
      })
    })

    describe('getStartWorkoutStorage', () => {
      it('returns start workout time from storage', () => {
        const time = '2023-12-25T10:00:00Z'

        mockStorage.getString.mockReturnValue(JSON.stringify(time))

        const result = getStartWorkoutStorage()

        expect(mockStorage.getString).toHaveBeenCalledWith(
          USER_START_WORKOUT_STORAGE,
        )
        expect(result).toBe(time)
      })

      it('returns null when no start workout time exists', () => {
        mockStorage.getString.mockReturnValue(undefined)

        const result = getStartWorkoutStorage()

        expect(result).toBeNull()
      })
    })

    describe('getBottomBarStorage', () => {
      it('returns bottom bar height from storage', () => {
        const height = 80

        mockStorage.getString.mockReturnValue(JSON.stringify(height))

        const result = getBottomBarStorage()

        expect(mockStorage.getString).toHaveBeenCalledWith(USER_STORAGE_TABBAR)
        expect(result).toBe(height)
      })

      it('returns null when no bottom bar height exists', () => {
        mockStorage.getString.mockReturnValue(undefined)

        const result = getBottomBarStorage()

        expect(result).toBeNull()
      })
    })

    describe('getCurrentWorkoutStorage', () => {
      it('returns current workout from storage', () => {
        const workout = {
          id: 'workout-1',
          name: 'Test Workout',
          exercise: {
            id: 'exercise-1',
            name: 'Push Up',
          },
        }

        mockStorage.getString.mockReturnValue(JSON.stringify(workout))

        const result = getCurrentWorkoutStorage()

        expect(mockStorage.getString).toHaveBeenCalledWith(
          USER_STORAGE_CURRENTWORKOUT,
        )
        expect(result).toEqual(workout)
      })

      it('returns null when no current workout exists', () => {
        mockStorage.getString.mockReturnValue(undefined)

        const result = getCurrentWorkoutStorage()

        expect(result).toBeNull()
      })
    })
  })

  describe('remove functions', () => {
    describe('removeUserFromStorage', () => {
      it('removes user data from storage', () => {
        removeUserFromStorage()

        expect(mockStorage.delete).toHaveBeenCalledWith(USER_STORAGE_KEY)
      })
    })

    describe('removeTokenFromStorage', () => {
      it('removes token from storage', () => {
        removeTokenFromStorage()

        expect(mockStorage.delete).toHaveBeenCalledWith(USER_STORAGE_TOKEN)
      })
    })

    describe('removeCurrentWorkoutFromStorage', () => {
      it('removes current workout from storage', () => {
        removeCurrentWorkoutFromStorage()

        expect(mockStorage.delete).toHaveBeenCalledWith(
          USER_STORAGE_CURRENTWORKOUT,
        )
      })
    })

    describe('removeStartWorkoutromStorage', () => {
      it('removes start workout time from storage', () => {
        removeStartWorkoutromStorage()

        expect(mockStorage.delete).toHaveBeenCalledWith(
          USER_START_WORKOUT_STORAGE,
        )
      })
    })
  })

  describe('integration scenarios', () => {
    it('can save and retrieve user data', () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      }

      // Save user
      saveUserInStorage(mockUser)
      expect(mockStorage.set).toHaveBeenCalledWith(
        USER_STORAGE_KEY,
        JSON.stringify(mockUser),
      )

      // Mock the return value for get
      mockStorage.getString.mockReturnValue(JSON.stringify(mockUser))

      // Get user
      const result = getUserFromStorage()
      expect(result).toEqual(mockUser)
    })

    it('handles complete auth flow', () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' }
      const mockToken = 'auth-token'
      const mockPlan = 'premium'

      // Save auth data
      saveUserInStorage(mockUser)
      saveTokenInStorage(mockToken)
      savePlanInStorage(mockPlan)

      expect(mockStorage.set).toHaveBeenCalledTimes(3)

      // Clear auth data
      removeUserFromStorage()
      removeTokenFromStorage()

      expect(mockStorage.delete).toHaveBeenCalledTimes(2)
      expect(mockStorage.delete).toHaveBeenCalledWith(USER_STORAGE_KEY)
      expect(mockStorage.delete).toHaveBeenCalledWith(USER_STORAGE_TOKEN)
    })

    it('handles workout flow', () => {
      const workout = {
        id: 'workout-1',
        name: 'Test Workout',
        exercise: { id: 'exercise-1', name: 'Push Up' },
      }
      const startTime = new Date()

      // Save workout data
      saveCurrentWorkoutStorage(workout)
      saveStartWorkoutStorage(startTime)

      expect(mockStorage.set).toHaveBeenCalledTimes(2)

      // Clear workout data
      removeCurrentWorkoutFromStorage()
      removeStartWorkoutromStorage()

      expect(mockStorage.delete).toHaveBeenCalledTimes(2)
      expect(mockStorage.delete).toHaveBeenCalledWith(
        USER_STORAGE_CURRENTWORKOUT,
      )
      expect(mockStorage.delete).toHaveBeenCalledWith(
        USER_START_WORKOUT_STORAGE,
      )
    })
  })
})
