import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { IUser } from '@_dtos_/userDTO'
import {
  getUserFromStorage,
  removeCurrentWorkoutFromStorage,
  removeStartWorkoutromStorage,
  removeUserFromStorage,
  savePlanInStorage,
  saveUserInStorage,
} from '@storage/index'
import { toast } from '@utils/toast-methods'

import { api, setSignOutCallback } from '../services/api'

export interface AuthState {
  user: IUser
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: AuthState | null
  loading: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState | null>(null)
  const [loading, setLoading] = useState(true) // Estado de loading

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/session', { email, password })

      console.log('response', response.data)
      const { token, user } = response.data

      setData({ user })
      saveUserInStorage(user)

      if (user?.student?.plan != null) {
        savePlanInStorage(user?.student?.plan?.id)
      }
    } catch (error) {
      toast.error(`${error.message}`)
    }
  }

  async function signOut() {
    removeUserFromStorage()
    removeStartWorkoutromStorage()
    removeCurrentWorkoutFromStorage()
    setData(null)

    if (api.defaults?.headers && api.defaults.headers.common) {
      delete api.defaults.headers.common.Authorization
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const user = await getUserFromStorage()

        if (user) {
          setData({ user })
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false) // Finaliza o estado de loading
      }
    }

    // Registra o callback de signOut no interceptor da API
    setSignOutCallback(signOut)

    loadData()
  }, [])

  return (
    <AuthContext.Provider value={{ user: data, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
