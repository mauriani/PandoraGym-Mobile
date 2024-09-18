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
  removeUserFromStorage,
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

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/session', {
      email,
      password,
    })

    const { token, user } = response.data

    if (api.defaults?.headers && api.defaults.headers.common) {
      api.defaults.headers.common['x-auth-token'] = token
    }

    const newItem = { ...user, token }

    setData({ ...user, token })

    saveUserInStorage(newItem)
  }

  async function signOut() {
    removeUserFromStorage()
    setData({} as AuthState)
    if (api.defaults?.headers && api.defaults.headers.common) {
      delete api.defaults.headers.common['x-auth-token']
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const user = getUserFromStorage()

        if (user) {
          setData(user)
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
