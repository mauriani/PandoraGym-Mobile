import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { getUserFromStorage } from '@storage/index'

import AuthRoutes from './auth.routes'
import RootStack from './stack.routes'

export function Routes() {
  const user = getUserFromStorage()

  return (
    <NavigationContainer>
      {user ? <RootStack /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
