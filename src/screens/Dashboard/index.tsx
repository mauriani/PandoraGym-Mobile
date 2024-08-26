import React from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function Dashboard() {
  const { navigate } = useNavigation()
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}
