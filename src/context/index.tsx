import React, { ReactNode } from 'react'

import { AuthProvider } from '../hooks/auth'

import { DialogAlertProvider } from './DialogAlertContext'
import { WorkoutProvider } from './WorkoutContext'

interface AuthProviderProps {
  children: ReactNode
}

function AppProvider({ children }: AuthProviderProps) {
  return (
    <AuthProvider>
      <DialogAlertProvider>
        <WorkoutProvider>{children}</WorkoutProvider>
      </DialogAlertProvider>
    </AuthProvider>
  )
}

export { AppProvider }
