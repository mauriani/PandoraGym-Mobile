import React from 'react'
import { View } from 'react-native'

type IProps = {
  children: React.ReactNode
}

export function Content({ children }: IProps) {
  return <View className="flex-1 gap-2 px-4 pt-4">{children}</View>
}
