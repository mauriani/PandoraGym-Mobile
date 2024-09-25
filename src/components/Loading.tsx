import React, { useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

export function Loading() {
  const { colorScheme } = useContext(ThemeContext)
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <ActivityIndicator size={'large'} color={themes[colorScheme].primary} />
    </View>
  )
}
