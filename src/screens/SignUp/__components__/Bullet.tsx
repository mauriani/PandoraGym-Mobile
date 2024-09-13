import React from 'react'
import { View } from 'react-native'

interface Props {
  active?: boolean
}

export function Bullet({ active = false }: Props) {
  return (
    <View
      className={`flex-1 h-2 rounded-full mx-1  ${
        active ? 'bg-primary' : 'bg-muted'
      }`}
    />
  )
}
