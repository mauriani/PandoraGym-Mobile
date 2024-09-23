import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { IUser } from '@_dtos_/userDTO'
import {
  getTokenFromStorage,
  getUserFromStorage,
  removeUserFromStorage,
  saveTokenInStorage,
  saveUserInStorage,
} from '@storage/index'

import { api } from '../services/api'

// aquilo que vou armazenar no meu estado
export interface AuthState {
  token: string
  user: IUser
}

interface SignInCredentials {
  email: string
  password: string
}

// aquilo que vou querer compartilhar
interface AuthContextData {
  user: AuthState
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  // criar um estado para amarzenar os estados de autentificação

  const [data, setData] = useState<AuthState>({} as AuthState)

  function loadInteceptor(token: string) {
    const authInterceptor = (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }

    api.interceptors.request.use(authInterceptor)
  }

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/session', {
      email,
      password,
    })

    const { token, user } = response.data

    loadInteceptor(token)

    setData({ ...user, token })

    saveUserInStorage(user)
    saveTokenInStorage(token)
  }

  async function signOut() {
    removeUserFromStorage()
    setData({} as AuthState)
    if (api.defaults?.headers && api.defaults.headers.common) {
      // eslint-disable-next-line prettier/prettier, dot-notation
      delete  api.defaults.headers.common['Authorization']
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const user = getUserFromStorage()
        const token = getTokenFromStorage()

        const item = { user, token }

        console.log('token', token)

        if (user) {
          setData(item)
        }

        if (token) {
          // eslint-disable-next-line dot-notation
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
      } catch (e) {
        console.log(e)
      }
    }

    loadData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

// esse vai ser o hook em si

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
