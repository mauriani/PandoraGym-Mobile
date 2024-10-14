import { useContext } from 'react'
import { StatusBar } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'

export function AuthRoutesStatusBar() {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <StatusBar
      backgroundColor="transparent"
      translucent
      barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  )
}
