import React from 'react'
import { View } from 'react-native'

type IProps = {
  children: React.ReactNode
}

export function Form({ children }: IProps) {
  return <View className="flex-1 px-5 mt-10 gap-4">{children}</View>
}
