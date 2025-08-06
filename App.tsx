import React from 'react'
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message'
import WorkoutBar from '@components/WorkoutBar'
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native'
import { Routes } from '@routes/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@theme/theme-provider'

import 'react-native-gesture-handler'

import { AppProvider } from './src/context'

import '@theme/global.css'

export const navigationRef = createNavigationContainerRef()

export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never)
  }
}

export default function App() {
  const queryClient = new QueryClient()

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#059669' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 12,
        }}
        text1NumberOfLines={2}
      />
    ),

    info: (props) => (
      <InfoToast
        {...props}
        style={{ borderLeftColor: '#22d3ee' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 12,
        }}
        text1NumberOfLines={2}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 12,
        }}
        text1NumberOfLines={2}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <>
          <AppProvider>
            <NavigationContainer ref={navigationRef}>
              <Routes />
              <WorkoutBar />

              <Toast
                visibilityTime={5000}
                position="bottom"
                config={toastConfig}
              />
            </NavigationContainer>
          </AppProvider>
        </>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
