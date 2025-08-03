import React from 'react'
import { Container } from '@components/Container'
import { Loading } from '@components/Loading'
import { useAuth } from '@hooks/auth'

import AuthRoutes from './auth.routes'
import RootStack from './stack.routes'

export function Routes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    )
  }

  return user ? <RootStack /> : <AuthRoutes />
}
