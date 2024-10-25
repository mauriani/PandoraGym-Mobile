import { getTokenFromStorage } from '@storage/index'
import { AppError } from '@utils/AppError'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pandoragym-api.vercel.app',
  // baseURL: 'http://localhost:3333',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(
        new AppError('Error no servidor. Tente mais tarde!'),
      )
    }
  },
)

api.interceptors.request.use((config) => {
  const token = getTokenFromStorage()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { api }
