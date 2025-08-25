import { Platform } from 'react-native'

export interface ApiConfig {
  baseURL: string
  timeout: number
  withCredentials: boolean
}

// URLs da API para diferentes ambientes e plataformas
const API_URLS = {
  production: 'https://pandoragym-api.vercel.app',
  development: {
    ios: 'http://localhost:3333',
    android: 'http://192.168.68.109:3333',
  },
}

/**
 * Retorna a URL da API baseada no ambiente e plataforma
 */
export const getApiUrl = (): string => {
  const isDevelopment = __DEV__ // React Native development flag
  
  if (!isDevelopment) {
    return API_URLS.production
  }
  
  // Desenvolvimento
  return Platform.OS === 'ios' 
    ? API_URLS.development.ios 
    : API_URLS.development.android
}

/**
 * Configuração padrão da API
 */
export const apiConfig: ApiConfig = {
  baseURL: getApiUrl(),
  timeout: 10000, // 10 segundos
  withCredentials: true,
}

/**
 * Log da configuração atual (apenas em desenvolvimento)
 */
if (__DEV__) {
  console.log('🔧 API Configuration:', {
    platform: Platform.OS,
    environment: __DEV__ ? 'development' : 'production',
    baseURL: apiConfig.baseURL,
  })
}
