import axios, { isAxiosError } from 'axios'

const api = axios.create({
  // baseURL: 'https://pandoragym-api.vercel.app',
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})

// Variável para controlar se já está fazendo refresh
let isRefreshing = false
let failedRequestsQueue: Array<{
  onSuccess: () => void
  onFailure: (err: any) => void
}> = []

// Função para deslogar o usuário (será definida pelo contexto de auth)
let signOutCallback: (() => void) | null = null

export const setSignOutCallback = (callback: () => void) => {
  signOutCallback = callback
}

// Interceptor para lidar com respostas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (isAxiosError(error)) {
      // Se o erro for 401 (sessão expirada) e não for a rota de refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (originalRequest.url === '/refresh') {
          // Se o refresh também falhou, desloga o usuário via contexto
          if (signOutCallback) {
            signOutCallback()
          }
          return Promise.reject(error)
        }

        originalRequest._retry = true

        if (!isRefreshing) {
          isRefreshing = true

          try {
            // Tenta fazer o refresh da sessão
            await api.post('/refresh')
            
            // Se o refresh foi bem-sucedido, processa a fila de requisições
            failedRequestsQueue.forEach(request => {
              request.onSuccess()
            })
            
            failedRequestsQueue = []
            
            // Refaz a requisição original
            return api(originalRequest)
            
          } catch (refreshError) {
            // Se o refresh falhou, rejeita todas as requisições na fila
            failedRequestsQueue.forEach(request => {
              request.onFailure(refreshError)
            })
            
            failedRequestsQueue = []
            
            // Desloga o usuário via contexto de auth
            if (signOutCallback) {
              signOutCallback()
            }
            
            return Promise.reject(refreshError)
          } finally {
            isRefreshing = false
          }
        }

        // Se já está fazendo refresh, adiciona a requisição na fila
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: () => {
              resolve(api(originalRequest))
            },
            onFailure: (err: any) => {
              reject(err)
            }
          })
        })
      }
    }

    // Para outros tipos de erro, retorna normalmente
    return Promise.reject(error)
  }
)

export { api }
