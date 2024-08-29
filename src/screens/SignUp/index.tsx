import React from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const { goBack } = useNavigation()
  return (
    <View className="flex-1 bg-background">
      <ImageBackground
        style={styles.backgroundImage}
        source={require('@assets/background.png')}
        resizeMode="cover">
        <View className="flex-1 justify-between mt-5 px-5">
          <View className="items-center mt-12">
            <Image source={require('@assets/logo-so-nome.png')} alt="" />
            <Text className="text-white text-center font-bold text-md mt-2">
              Treine sua mente e domine o seu corpo.
            </Text>
          </View>

          {/* Formulário */}
          <View className="mt-11">
            <Text className="text-white text-center font-bold text-lg mb-6">
              Crie sua conta
            </Text>

            <Input
              label="E-mail"
              keyboardType="email-address"
              inputClasses="bg-neutral-900 text-white"
            />

            <Input
              label="Senha"
              secureTextEntry
              inputClasses="bg-neutral-900 text-white mt-4"
            />

            <Input
              label="Confirmar Senha"
              secureTextEntry
              inputClasses="bg-neutral-900 text-white mt-4"
            />

            <Button label="Cadastra-se" className="mt-6" />
          </View>

          {/* Footer */}
          <View className="mb-10">
            <Button
              label="Voltar para o login"
              variant="outline"
              onPress={goBack}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    height: Dimensions.get('window').height / 1.5,
  },
})
