import React from 'react'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'
import RootStack from '@routes/index'
import { ThemeProvider } from '@theme/theme-provider'

import 'react-native-gesture-handler'

import { AppProvider } from './src/hooks'

import '@theme/global.css'

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ThemeProvider>
        <AppProvider>
          <RootStack />
        </AppProvider>

        <Toast visibilityTime={5000} position="bottom" />
      </ThemeProvider>
    </>
  )
}
