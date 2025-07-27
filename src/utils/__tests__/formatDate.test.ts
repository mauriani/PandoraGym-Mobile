import { dateFormatter, onFinallyWorkoutTime } from '../formatDate'

// Mock do storage
jest.mock('@storage/index', () => ({
  getStartWorkoutStorage: jest.fn()
}))

// Mock do date-fns
jest.mock('date-fns', () => ({
  differenceInMilliseconds: jest.fn()
}))

describe('formatDate utils', () => {
  describe('dateFormatter', () => {
    it('formats date string correctly', () => {
      const dateString = '2023-12-25T10:30:00Z'
      const result = dateFormatter(dateString)
      
      // O resultado pode variar dependendo do timezone, então vamos verificar o formato
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
    })

    it('handles different date formats', () => {
      const dateString = '2023-01-01T00:00:00Z'
      const result = dateFormatter(dateString)
      
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
    })

    it('handles ISO date strings', () => {
      const dateString = '2023-06-15T15:45:30.123Z'
      const result = dateFormatter(dateString)
      
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
    })
  })

  describe('onFinallyWorkoutTime', () => {
    const mockGetStartWorkoutStorage = require('@storage/index').getStartWorkoutStorage
    const mockDifferenceInMilliseconds = require('date-fns').differenceInMilliseconds

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('calculates workout time correctly', () => {
      const startTime = new Date('2023-12-25T11:00:00Z')
      
      mockGetStartWorkoutStorage.mockReturnValue(startTime)
      mockDifferenceInMilliseconds.mockReturnValue(3600000) // 1 hour in milliseconds
      
      const result = onFinallyWorkoutTime()
      
      expect(result).toBe(3600) // 3600 seconds = 1 hour
      expect(mockGetStartWorkoutStorage).toHaveBeenCalledTimes(1)
    })

    it('handles short workout duration', () => {
      const startTime = new Date('2023-12-25T11:58:00Z')
      
      mockGetStartWorkoutStorage.mockReturnValue(startTime)
      mockDifferenceInMilliseconds.mockReturnValue(120000) // 2 minutes in milliseconds
      
      const result = onFinallyWorkoutTime()
      
      expect(result).toBe(120) // 120 seconds = 2 minutes
    })

    it('handles zero duration', () => {
      const startTime = new Date('2023-12-25T12:00:00Z')
      
      mockGetStartWorkoutStorage.mockReturnValue(startTime)
      mockDifferenceInMilliseconds.mockReturnValue(0)
      
      const result = onFinallyWorkoutTime()
      
      expect(result).toBe(0)
    })

    it('handles long workout duration', () => {
      const startTime = new Date('2023-12-25T10:00:00Z')
      
      mockGetStartWorkoutStorage.mockReturnValue(startTime)
      mockDifferenceInMilliseconds.mockReturnValue(7200000) // 2 hours in milliseconds
      
      const result = onFinallyWorkoutTime()
      
      expect(result).toBe(7200) // 7200 seconds = 2 hours
    })
  })
})
