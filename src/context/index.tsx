import React, { ReactNode } from 'react'

import { AuthProvider } from '../hooks/auth'

import { WorkoutProvider } from './WorkoutContext'

interface AuthProviderProps {
  children: ReactNode
}

function AppProvider({ children }: AuthProviderProps) {
  return (
    <AuthProvider>
      <WorkoutProvider>{children}</WorkoutProvider>
    </AuthProvider>
  )
}

export { AppProvider }
