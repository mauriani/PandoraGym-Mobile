import React, { createContext, ReactNode, useContext, useState } from 'react'
import { api } from '@services/api'
// usar context, amarzenar dado em um único local

interface User {
  token: string
}

interface SignInCredentials {
  email: string
  password: string
}

// aquilo que vou querer compartilhar
interface AuthContextData {
  user: User
  signIn: (credentials: SignInCredentials) => Promise<void>
  // signOut: () => Promise<void>
  // updatedUser: (user: User) => Promise<void>
  loading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  // criar um estado para amarzenar os estados de autentificação

  const [data, setData] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      })

      const { token } = response.data

      // inclui o token no "cabecario" do user
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      console.log(token)

      // setData({ token })
    } catch (error) {
      // throw new Error(error);
      console.log('throw', error)
    }
  }

  // async function signOut() {
  //   try {
  //     const userCollection = database.get<ModelUser>('users')
  //     await database.write(async () => {
  //       const userSelected = await userCollection.find(data.id)
  //       await userSelected.destroyPermanently()
  //     })

  //     setData({} as User)
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }

  // async function updatedUser(user: User) {
  //   try {
  //     const userCollection = database.get<ModelUser>('users')
  //     await database.write(async () => {
  //       const userSelected = await userCollection.find(user.id)
  //       await userSelected.update((userData) => {
  //         userData.name = user.name
  //         userData.driver_license = user.driver_license
  //         userData.avatar = user.avatar
  //       })
  //     })

  //     setData(user)
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }

  // useEffect(() => {
  //   async function loadUserData() {
  //     const userCollection = database.get<ModelUser>('users')
  //     const response = await userCollection.query().fetch()
  //     if (response.length > 0) {
  //       const userData = response[0]._raw as unknown as User

  //       api.defaults.headers.common.Authorization = `Bearer ${userData.token}`

  //       setData(userData)
  //       setLoading(false)
  //     }
  //   }
  //   loadUserData()
  // })

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        // signOut,
        // updatedUser,
        loading,
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
