import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ModeToggle } from '@components/toggle-theme'
import { Button } from '@components/ui/Button'
import MyLoader from '@components/MyLoader'

export function SignIn() {
  const { navigate } = useNavigation()
  return (
    <View className="flex-1 bg-background px-4 gap-6">
      {/* <Text className="text-center text-foreground">SignIn</Text>

      <TouchableOpacity
        onPress={() => navigate('DrawerNavigator')}
        className="bg-blue-500 
        text-white font-bold h-8 justify-center mt-6 rounded-md"
      >
        <Text className="text-center">Navigate Drawer</Text>
      </TouchableOpacity>

      <Button label="Confirmar" />

      <ModeToggle />

      <MyLoader /> */}
    </View>
  )
}
