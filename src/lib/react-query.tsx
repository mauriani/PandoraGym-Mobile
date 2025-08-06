import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from '@utils/toast-methods'

let displayedNetworkFailureError = false

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        // Se for erro 401 (sessão expirada), não tenta novamente
        // O interceptor da API já vai lidar com o refresh
        if (isAxiosError(error) && error.response?.status === 401) {
          return false
        }

        if (failureCount >= 3) {
          if (displayedNetworkFailureError === false) {
            displayedNetworkFailureError = true

            toast.error(
              'A aplicação está demorando mais que o esperado para carregar, tente novamente em alguns minutos.',
              {
                onDismiss: () => {
                  displayedNetworkFailureError = false
                },
              },
            )
          }

          return false
        }

        return true
      },
    },
    mutations: {
      onError(error) {
        if (isAxiosError(error)) {
          // Se for erro 401, não mostra toast pois o interceptor já vai lidar
          if (error.response?.status === 401) {
            return
          }

          if ('message' in error.response?.data) {
            toast.error(error.response?.data.message)
          } else {
            toast.error('Erro ao processar operação!')
          }
        }
      },
    },
  },
})
