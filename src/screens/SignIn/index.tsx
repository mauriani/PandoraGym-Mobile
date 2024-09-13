import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Container } from '@components/Container'
import { Button } from '@components/ui/Button'
import { InputFormControl } from '@components/ui/InputFormControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import zod from 'zod'

const schema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'O campo de Email é obrigatório' })
    .email(),
  password: zod.string().min(1, { message: 'O campo de Senha é obrigatório!' }),
})

export type zodSchema = zod.infer<typeof schema>

export function SignIn() {
  const { navigate } = useNavigation()

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'maurianim@gmail.com',
      password: '123456',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  async function submit(data: zodSchema) {
    console.log('data', data)
    navigate('tabNavigator')
  }

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('@assets/background.png')}
            resizeMode="cover">
            <View className="flex-1 justify-between mt-5 px-5">
              {/* Logo e Subtítulo */}
              <View className="items-center mt-12">
                <Image source={require('@assets/logo-so-nome.png')} alt="" />
                <Text className="text-white text-center font-bold text-md mt-2">
                  Treine sua mente e domine o seu corpo.
                </Text>
              </View>

              {/* Formulário */}
              <View className="mt-11">
                <Text className="text-white text-center font-bold text-lg mb-6">
                  Acesse sua conta
                </Text>

                <InputFormControl
                  control={control}
                  name="email"
                  label="E-mail"
                  keyboardType="email-address"
                  inputClasses="bg-neutral-900 text-white"
                  error={errors.email}
                />

                <InputFormControl
                  control={control}
                  name="password"
                  label="Senha"
                  inputClasses="bg-neutral-900 text-white mt-4"
                  error={errors.password}
                  typePassword={true}
                />

                <Button
                  label="Acessar"
                  className="mt-6"
                  onPress={handleSubmit(submit)}
                />
              </View>

              {/* Footer */}
              <View className="mb-10">
                <Text className="text-white text-base mb-3 text-center">
                  Não possui conta?
                </Text>
                <Button
                  label="Criar conta"
                  variant="outline"
                  onPress={() => navigate('signUp')}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    height: Dimensions.get('window').height / 1.5, // Ocupa metade da altura da tela
  },
})
