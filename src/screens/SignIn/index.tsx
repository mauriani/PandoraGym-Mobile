import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'

export function SignIn() {
  return (
    <ImageBackground
      className="flex-1"
      source={require('@assets/background.png')}
      resizeMode="cover">
      <View className="flex-1 justify-center gap-2 p-5 ">
        <Text className="text-primary-foreground text-center font-bold text-lg font-primary_bold">
          Acesse sua conta
        </Text>

        <Input label="Email" keyboardType="email-address" />

        <Input label="Senha" />

        <Button label="Confirmar" />
      </View>
    </ImageBackground>
  )
}
