import React from 'react'
import { View } from 'react-native'

interface Props {
  active?: boolean
}

export function Bullet({ active = false }: Props) {
  return (
    <View
      className={`mx-1 h-2 flex-1 rounded-full ${
        active ? 'bg-primary' : 'bg-muted'
      }`}
    />
  )
}
