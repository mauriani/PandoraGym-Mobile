import React, { ReactNode } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { AuthProvider } from '../hooks/auth'

import { DialogAlertProvider } from './DialogAlertContext'
import { WorkoutProvider } from './WorkoutContext'

interface AuthProviderProps {
  children: ReactNode
}

function AppProvider({ children }: AuthProviderProps) {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DialogAlertProvider>
          <WorkoutProvider>{children}</WorkoutProvider>
        </DialogAlertProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  )
}

export { AppProvider }
