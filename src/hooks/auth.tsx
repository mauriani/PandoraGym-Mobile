import React, { createContext, ReactNode, useContext, useState } from 'react'
import { IUser } from '@_dtos_/userDTO'
import { saveUserInStorage } from '@storage/index'

import { api } from '../services/api'

// aquilo que vou armazenar no meu estado
interface AuthState {
  token: string
  user: IUser
}

interface SignInCredentials {
  email: string
  password: string
}

// aquilo que vou querer compartilhar
interface AuthContextData {
  user: IUser
  signIn: (credentials: SignInCredentials) => Promise<void>
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

    console.log(user)

    setData({ token, user })

    saveUserInStorage(user)
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
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
