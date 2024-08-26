import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'

export function Dashboard() {
  const { navigate } = useNavigation()
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}
