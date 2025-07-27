import axios from 'axios'
import { AppError } from '@utils/AppError'
import { getTokenFromStorage } from '@storage/index'

// Mock das dependências
jest.mock('@storage/index', () => ({
  getTokenFromStorage: jest.fn()
}))

jest.mock('@utils/AppError', () => ({
  AppError: jest.fn().mockImplementation((message: string) => {
    const error = new Error(message) as any
    error.name = 'AppError'
    return error
  })
}))

// Mock do axios
const mockAxios = {
  create: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  }
}

jest.mock('axios', () => mockAxios)

const mockGetTokenFromStorage = getTokenFromStorage as jest.MockedFunction<typeof getTokenFromStorage>
const mockAppError = AppError as jest.MockedFunction<typeof AppError>

describe('API Service', () => {
  let mockApiInstance: any
  let requestInterceptor: any
  let responseInterceptor: any
  let responseErrorHandler: any

  beforeEach(() => {
    jest.clearAllMocks()
    
    // Setup mock API instance
    mockApiInstance = {
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    }
    
    mockAxios.create.mockReturnValue(mockApiInstance)
    
    // Capture interceptors when they're registered
    mockApiInstance.interceptors.request.use.mockImplementation((interceptor: any) => {
      requestInterceptor = interceptor
    })
    
    mockApiInstance.interceptors.response.use.mockImplementation((success: any, error: any) => {
      responseInterceptor = success
      responseErrorHandler = error
    })
  })

  describe('API Configuration', () => {
    it('creates axios instance with correct baseURL', () => {
      delete require.cache[require.resolve('../api')]
      require('../api')
      
      expect(mockAxios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3333',
      })
    })

    it('exports api object', () => {
      delete require.cache[require.resolve('../api')]
      const { api } = require('../api')
      expect(api).toBeDefined()
      expect(typeof api).toBe('object')
    })

    it('api instance has interceptors configured', () => {
      delete require.cache[require.resolve('../api')]
      const { api } = require('../api')
      expect(api.interceptors).toBeDefined()
      expect(api.interceptors.request).toBeDefined()
      expect(api.interceptors.response).toBeDefined()
    })
  })

  describe('Request Interceptor', () => {
    beforeEach(() => {
      require('../api') // Load the module to register interceptors
    })

    it('adds authorization header when token exists', () => {
      const mockToken = 'test-token-123'
      mockGetTokenFromStorage.mockReturnValue(mockToken)
      
      const mockConfig = { headers: {} }
      const result = requestInterceptor(mockConfig)
      
      expect(mockGetTokenFromStorage).toHaveBeenCalled()
      expect(result.headers.Authorization).toBe(`Bearer ${mockToken}`)
      expect(result).toBe(mockConfig)
    })

    it('does not add authorization header when token is null', () => {
      mockGetTokenFromStorage.mockReturnValue(null)
      
      const mockConfig = { headers: {} }
      const result = requestInterceptor(mockConfig)
      
      expect(mockGetTokenFromStorage).toHaveBeenCalled()
      expect(result.headers.Authorization).toBeUndefined()
      expect(result).toBe(mockConfig)
    })

    it('does not add authorization header when token is undefined', () => {
      mockGetTokenFromStorage.mockReturnValue(undefined)
      
      const mockConfig = { headers: {} }
      const result = requestInterceptor(mockConfig)
      
      expect(mockGetTokenFromStorage).toHaveBeenCalled()
      expect(result.headers.Authorization).toBeUndefined()
      expect(result).toBe(mockConfig)
    })

    it('preserves existing headers', () => {
      const mockToken = 'test-token-123'
      mockGetTokenFromStorage.mockReturnValue(mockToken)
      
      const mockConfig = { 
        headers: { 
          'Content-Type': 'application/json',
          'Custom-Header': 'custom-value'
        } 
      }
      const result = requestInterceptor(mockConfig)
      
      expect(result.headers['Content-Type']).toBe('application/json')
      expect(result.headers['Custom-Header']).toBe('custom-value')
      expect(result.headers.Authorization).toBe(`Bearer ${mockToken}`)
    })
  })

  describe('Response Interceptor', () => {
    beforeEach(() => {
      require('../api') // Load the module to register interceptors
    })

    it('returns response unchanged on success', () => {
      const mockResponse = { data: { message: 'success' }, status: 200 }
      const result = responseInterceptor(mockResponse)
      
      expect(result).toBe(mockResponse)
    })

    it('handles error with response data', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Custom error message'
          }
        }
      }
      
      await expect(responseErrorHandler(mockError)).rejects.toThrow()
      expect(mockAppError).toHaveBeenCalledWith('Custom error message')
    })

    it('handles error without response data', async () => {
      const mockError = {
        response: null
      }
      
      await expect(responseErrorHandler(mockError)).rejects.toThrow()
      expect(mockAppError).toHaveBeenCalledWith('Error no servidor. Tente mais tarde!')
    })

    it('handles error with response but no data', async () => {
      const mockError = {
        response: {
          data: null
        }
      }
      
      await expect(responseErrorHandler(mockError)).rejects.toThrow()
      expect(mockAppError).toHaveBeenCalledWith('Error no servidor. Tente mais tarde!')
    })

    it('handles error with empty response data', async () => {
      const mockError = {
        response: {
          data: {}
        }
      }
      
      await expect(responseErrorHandler(mockError)).rejects.toThrow()
      expect(mockAppError).toHaveBeenCalledWith(undefined)
    })

    it('handles network error', async () => {
      const mockError = {
        message: 'Network Error'
      }
      
      await expect(responseErrorHandler(mockError)).rejects.toThrow()
      expect(mockAppError).toHaveBeenCalledWith('Error no servidor. Tente mais tarde!')
    })
  })

  describe('Module Integration', () => {
    it('can be imported multiple times without errors', () => {
      expect(() => require('../api')).not.toThrow()
      expect(() => require('../api')).not.toThrow()
      expect(() => require('../api')).not.toThrow()
    })

    it('maintains same instance across imports', () => {
      const { api: api1 } = require('../api')
      const { api: api2 } = require('../api')
      
      expect(api1).toBe(api2)
    })
  })
})
