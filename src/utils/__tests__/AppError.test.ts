import { AppError } from '../AppError'

describe('AppError', () => {
  it('creates an AppError instance with message', () => {
    const message = 'Test error message'
    const error = new AppError(message)
    
    expect(error).toBeInstanceOf(AppError)
    expect(error.message).toBe(message)
  })

  it('handles empty message', () => {
    const error = new AppError('')
    
    expect(error.message).toBe('')
  })

  it('handles long message', () => {
    const longMessage = 'This is a very long error message that contains multiple words and should be handled correctly by the AppError class'
    const error = new AppError(longMessage)
    
    expect(error.message).toBe(longMessage)
  })

  it('handles special characters in message', () => {
    const specialMessage = 'Error: 404 - Resource not found! @#$%^&*()'
    const error = new AppError(specialMessage)
    
    expect(error.message).toBe(specialMessage)
  })

  it('handles unicode characters', () => {
    const unicodeMessage = 'Erro: Usuário não encontrado 🚫'
    const error = new AppError(unicodeMessage)
    
    expect(error.message).toBe(unicodeMessage)
  })

  it('can be thrown and caught', () => {
    const message = 'Test throw error'
    
    expect(() => {
      throw new AppError(message)
    }).toThrow(AppError)
    
    try {
      throw new AppError(message)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect((error as AppError).message).toBe(message)
    }
  })

  it('can be used in error handling scenarios', () => {
    const handleError = (error: AppError) => {
      return `Handled: ${error.message}`
    }
    
    const error = new AppError('Network error')
    const result = handleError(error)
    
    expect(result).toBe('Handled: Network error')
  })
})
