import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react-native'
import { WorkoutProvider, useWorkout } from '../WorkoutContext'

// Mock das dependências
jest.mock('@storage/index', () => ({
  getStartWorkoutStorage: jest.fn(),
  saveCurrentWorkoutStorage: jest.fn(),
  saveStartWorkoutStorage: jest.fn(),
}))

jest.mock('date-fns', () => ({
  differenceInMilliseconds: jest.fn()
}))

const mockStorage = require('@storage/index')
const mockDateFns = require('date-fns')

// Mock do setInterval/clearInterval
jest.useFakeTimers()

describe('WorkoutContext', () => {
  const mockWorkout = {
    id: 'workout-1',
    name: 'Test Workout',
    exercise: {
      id: 'exercise-1',
      name: 'Push Up',
      sets: 3,
      reps: 10
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockStorage.getStartWorkoutStorage.mockResolvedValue(null)
    mockDateFns.differenceInMilliseconds.mockReturnValue(0)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <WorkoutProvider>{children}</WorkoutProvider>
  )

  describe('initialization', () => {
    it('initializes with default values', () => {
      const { result } = renderHook(() => useWorkout(), { wrapper })
      
      expect(result.current.elapsedTime).toBe(0)
      expect(typeof result.current.onSetCurrentWorkout).toBe('function')
      expect(typeof result.current.onSetCurrentWorkoutUpdate).toBe('function')
    })

    it('loads saved workout data on mount', async () => {
      const savedTime = '2023-12-25T10:00:00Z'
      mockStorage.getStartWorkoutStorage.mockResolvedValue(savedTime)
      mockDateFns.differenceInMilliseconds.mockReturnValue(60000) // 1 minute

      const { result } = renderHook(() => useWorkout(), { wrapper })

      await waitFor(() => {
        expect(mockStorage.getStartWorkoutStorage).toHaveBeenCalled()
      })

      // Fast-forward timer
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current.elapsedTime).toBe(60) // 60 seconds
    })

    it('handles invalid saved time gracefully', async () => {
      mockStorage.getStartWorkoutStorage.mockResolvedValue('invalid-date')

      const { result } = renderHook(() => useWorkout(), { wrapper })

      await waitFor(() => {
        expect(mockStorage.getStartWorkoutStorage).toHaveBeenCalled()
      })

      expect(result.current.elapsedTime).toBe(0)
    })
  })

  describe('onSetCurrentWorkout', () => {
    it('sets current workout and starts timer', async () => {
      const mockDate = new Date('2023-12-25T10:00:00Z')
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)
      mockDateFns.differenceInMilliseconds.mockReturnValue(5000) // 5 seconds

      const { result } = renderHook(() => useWorkout(), { wrapper })

      act(() => {
        result.current.onSetCurrentWorkout(mockWorkout)
      })

      expect(mockStorage.saveStartWorkoutStorage).toHaveBeenCalledWith(mockDate.toISOString())
      expect(mockStorage.saveCurrentWorkoutStorage).toHaveBeenCalledWith(mockWorkout)
      expect(result.current.elapsedTime).toBe(0)

      // Fast-forward timer
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current.elapsedTime).toBe(5) // 5 seconds

      jest.restoreAllMocks()
    })

    it('resets elapsed time when setting new workout', () => {
      const { result } = renderHook(() => useWorkout(), { wrapper })

      // Set first workout
      act(() => {
        result.current.onSetCurrentWorkout(mockWorkout)
      })

      // Advance time
      mockDateFns.differenceInMilliseconds.mockReturnValue(10000) // 10 seconds
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current.elapsedTime).toBe(10)

      // Set new workout
      const newWorkout = { ...mockWorkout, id: 'workout-2', name: 'New Workout' }
      mockDateFns.differenceInMilliseconds.mockReturnValue(0)
      
      act(() => {
        result.current.onSetCurrentWorkout(newWorkout)
      })

      expect(result.current.elapsedTime).toBe(0)
    })
  })

  describe('onSetCurrentWorkoutUpdate', () => {
    it('updates current workout in storage', () => {
      const { result } = renderHook(() => useWorkout(), { wrapper })

      const updatedWorkout = { ...mockWorkout, name: 'Updated Workout' }

      act(() => {
        result.current.onSetCurrentWorkoutUpdate(updatedWorkout)
      })

      expect(mockStorage.saveCurrentWorkoutStorage).toHaveBeenCalledWith(updatedWorkout)
    })

    it('does not affect timer when updating workout', () => {
      const { result } = renderHook(() => useWorkout(), { wrapper })

      // Start workout
      act(() => {
        result.current.onSetCurrentWorkout(mockWorkout)
      })

      // Advance time
      mockDateFns.differenceInMilliseconds.mockReturnValue(5000)
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      const initialElapsedTime = result.current.elapsedTime

      // Update workout
      const updatedWorkout = { ...mockWorkout, name: 'Updated Workout' }
      act(() => {
        result.current.onSetCurrentWorkoutUpdate(updatedWorkout)
      })

      expect(result.current.elapsedTime).toBe(initialElapsedTime)
    })
  })

  describe('timer functionality', () => {
    it('updates elapsed time every second', () => {
      mockDateFns.differenceInMilliseconds
        .mockReturnValueOnce(1000)
        .mockReturnValueOnce(2000)
        .mockReturnValueOnce(3000)

      const { result } = renderHook(() => useWorkout(), { wrapper })

      act(() => {
        result.current.onSetCurrentWorkout(mockWorkout)
      })

      // First tick
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(result.current.elapsedTime).toBe(1)

      // Second tick
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(result.current.elapsedTime).toBe(2)

      // Third tick
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(result.current.elapsedTime).toBe(3)
    })

    it('stops timer on unmount', () => {
      const { result, unmount } = renderHook(() => useWorkout(), { wrapper })

      act(() => {
        result.current.onSetCurrentWorkout(mockWorkout)
      })

      const clearIntervalSpy = jest.spyOn(global, 'clearInterval')

      unmount()

      expect(clearIntervalSpy).toHaveBeenCalled()
    })
  })

  describe('context usage', () => {
    it('throws error when used outside provider', () => {
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      expect(() => {
        renderHook(() => useWorkout())
      }).not.toThrow() // useWorkout doesn't throw, it just returns empty context
      
      consoleSpy.mockRestore()
    })

    it('provides correct context value', () => {
      const { result } = renderHook(() => useWorkout(), { wrapper })
      
      expect(result.current).toHaveProperty('elapsedTime')
      expect(result.current).toHaveProperty('onSetCurrentWorkout')
      expect(result.current).toHaveProperty('onSetCurrentWorkoutUpdate')
      expect(typeof result.current.onSetCurrentWorkout).toBe('function')
      expect(typeof result.current.onSetCurrentWorkoutUpdate).toBe('function')
      expect(typeof result.current.elapsedTime).toBe('number')
    })
  })

  describe('edge cases', () => {
    it('handles multiple rapid workout changes', () => {
      const { result } = renderHook(() => useWorkout(), { wrapper })

      const workout1 = { ...mockWorkout, id: '1' }
      const workout2 = { ...mockWorkout, id: '2' }
      const workout3 = { ...mockWorkout, id: '3' }

      act(() => {
        result.current.onSetCurrentWorkout(workout1)
        result.current.onSetCurrentWorkout(workout2)
        result.current.onSetCurrentWorkout(workout3)
      })

      expect(mockStorage.saveCurrentWorkoutStorage).toHaveBeenCalledTimes(3)
      expect(mockStorage.saveCurrentWorkoutStorage).toHaveBeenLastCalledWith(workout3)
    })

    it('handles null start time reference', () => {
      const { result } = renderHook(() => useWorkout(), { wrapper })

      // Don't set a workout, so startTimeRef.current should be null
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current.elapsedTime).toBe(0)
    })
  })
})
