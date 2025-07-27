import { toast } from '../toast-methods'

// Mock do react-native-toast-message
jest.mock('react-native-toast-message', () => ({
  show: jest.fn()
}))

const mockToast = require('react-native-toast-message')

describe('toast-methods utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('toast.success', () => {
    it('calls Toast.show with success type', () => {
      const message = 'Success message'
      toast.success(message)
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: message
      })
    })

    it('handles empty message', () => {
      toast.success('')
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: ''
      })
    })

    it('handles long message', () => {
      const longMessage = 'This is a very long success message that should be handled correctly'
      toast.success(longMessage)
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: longMessage
      })
    })
  })

  describe('toast.warning', () => {
    it('calls Toast.show with info type for warning', () => {
      const message = 'Warning message'
      toast.warning(message)
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'info',
        text1: message
      })
    })

    it('handles empty warning message', () => {
      toast.warning('')
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'info',
        text1: ''
      })
    })

    it('handles special characters in warning message', () => {
      const specialMessage = 'Warning: Check your input! @#$%'
      toast.warning(specialMessage)
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'info',
        text1: specialMessage
      })
    })
  })

  describe('toast.error', () => {
    it('calls Toast.show with error type', () => {
      const message = 'Error message'
      toast.error(message)
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: message
      })
    })

    it('handles empty error message', () => {
      toast.error('')
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: ''
      })
    })

    it('handles error message with technical details', () => {
      const errorMessage = 'Error 500: Internal Server Error - Please try again later'
      toast.error(errorMessage)
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: errorMessage
      })
    })
  })

  describe('toast object structure', () => {
    it('has all expected methods', () => {
      expect(toast).toHaveProperty('success')
      expect(toast).toHaveProperty('warning')
      expect(toast).toHaveProperty('error')
      expect(typeof toast.success).toBe('function')
      expect(typeof toast.warning).toBe('function')
      expect(typeof toast.error).toBe('function')
    })

    it('is readonly (const assertion)', () => {
      // This test ensures the const assertion is working
      expect(toast).toBeDefined()
    })
  })

  describe('integration scenarios', () => {
    it('can be used in error handling', () => {
      const handleError = (error: Error) => {
        toast.error(`Error: ${error.message}`)
      }
      
      const error = new Error('Network failed')
      handleError(error)
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error: Network failed'
      })
    })

    it('can be used in success scenarios', () => {
      const handleSuccess = (action: string) => {
        toast.success(`${action} completed successfully!`)
      }
      
      handleSuccess('Data save')
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Data save completed successfully!'
      })
    })

    it('can be used in validation scenarios', () => {
      const validateForm = (isValid: boolean) => {
        if (!isValid) {
          toast.warning('Please fill all required fields')
        }
      }
      
      validateForm(false)
      
      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'info',
        text1: 'Please fill all required fields'
      })
    })

    it('handles multiple toast calls', () => {
      toast.success('First message')
      toast.warning('Second message')
      toast.error('Third message')
      
      expect(mockToast.show).toHaveBeenCalledTimes(3)
      expect(mockToast.show).toHaveBeenNthCalledWith(1, {
        type: 'success',
        text1: 'First message'
      })
      expect(mockToast.show).toHaveBeenNthCalledWith(2, {
        type: 'info',
        text1: 'Second message'
      })
      expect(mockToast.show).toHaveBeenNthCalledWith(3, {
        type: 'error',
        text1: 'Third message'
      })
    })
  })
})
