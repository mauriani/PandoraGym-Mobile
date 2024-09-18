import React from 'react'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'
import { Routes } from '@routes/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@theme/theme-provider'

import 'react-native-gesture-handler'

import { AppProvider } from './src/hooks'

import '@theme/global.css'

export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <ThemeProvider>
          <AppProvider>
            <Routes />
          </AppProvider>

          <Toast visibilityTime={5000} position="bottom" />
        </ThemeProvider>
      </>
    </QueryClientProvider>
  )
}
