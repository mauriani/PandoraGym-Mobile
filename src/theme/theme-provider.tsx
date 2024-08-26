import React, { createContext, useState } from 'react'
import { View } from 'react-native'
import { cn } from '@utils/cn'

interface ThemeContextProps {
  colorScheme: 'light' | 'dark'
  toggleMode: () => void
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
)

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark')

  function toggleMode() {
    setColorScheme((state) => (state === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleMode }}>
      <View
        className={cn('flex-1', {
          light: colorScheme === 'light',
          dark: colorScheme === 'dark',
        })}>
        {children}
      </View>
    </ThemeContext.Provider>
  )
}
