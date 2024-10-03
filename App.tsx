import React from 'react'
import { StatusBar } from 'react-native'
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message'
import { Routes } from '@routes/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@theme/theme-provider'

import 'react-native-gesture-handler'

import { AppProvider } from './src/hooks'

import '@theme/global.css'

export default function App() {
  const queryClient = new QueryClient()

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
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

          <Toast visibilityTime={5000} position="bottom" config={toastConfig} />
        </ThemeProvider>
      </>
    </QueryClientProvider>
  )
}
