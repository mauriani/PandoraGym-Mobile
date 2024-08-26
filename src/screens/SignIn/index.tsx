import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ModeToggle } from '@components/toggle-theme'
import { Button } from '@components/ui/Button'
import MyLoader from '@components/MyLoader'
import { Input } from '@components/ui/Input'

export function SignIn() {
  const { navigate } = useNavigation()
  return (
    <View className="flex-1 bg-background justify-center">

      <View className='justify-center gap-2 p-5'>

        <Text className='text-primary-foreground text-center font-bold text-lg font-primary_bold'>Acesse sua conta</Text>

        <Input label='Email' keyboardType='email-address'/>

        <Input label='Senha'/>


        <Button label="Confirmar" />
      </View>

  

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
