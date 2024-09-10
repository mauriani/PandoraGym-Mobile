import React from 'react'
import { View } from 'react-native'

type IProps = {
  children: React.ReactNode
}

export function Content({ children }: IProps) {
  return <View className="flex-1 pt-4 px-4">{children}</View>
}
