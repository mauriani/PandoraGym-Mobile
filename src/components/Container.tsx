import React from 'react'
import { View } from 'react-native'

type IProps = {
  children: React.ReactNode
}

export function Container({ children }: IProps) {
  return <View className="flex-1 bg-background">{children}</View>
}
