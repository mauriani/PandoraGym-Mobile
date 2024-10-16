import React from 'react'
import { useAuth } from '@hooks/auth'

import AuthRoutes from './auth.routes'
import RootStack from './stack.routes'

export function Routes() {
  const { user } = useAuth()

  return <>{user?.token ? <RootStack /> : <AuthRoutes />}</>
}
