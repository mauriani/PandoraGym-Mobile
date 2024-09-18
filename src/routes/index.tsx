import React from 'react'
import { useAuth } from '@hooks/auth'
import { NavigationContainer } from '@react-navigation/native'

import AuthRoutes from './auth.routes'
import RootStack from './stack.routes'

export function Routes() {
  const { user } = useAuth()

  console.log('routes-user', user)

  return (
    <NavigationContainer>
      {user ? <RootStack /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
