import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-toast-message'
import RootStack from '@routes/index'
import { ThemeProvider } from '@theme/theme-provider'

import 'react-native-gesture-handler'

import '@theme/global.css'

export default function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ThemeProvider>
        <RootStack />
        <Toast visibilityTime={5000} position="bottom" />
      </ThemeProvider>
    </>
  )
}
