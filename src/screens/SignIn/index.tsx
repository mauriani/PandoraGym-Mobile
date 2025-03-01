import React, { useEffect, useState } from 'react'
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
import { useAuth } from '@hooks/auth'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootSAuthParamList } from '@routes/auth.routes'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import zod from 'zod'

const schema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'O campo de Email é obrigatório' })
    .email(),
  password: zod.string().min(1, { message: 'O campo de Senha é obrigatório!' }),
})

export type zodSchema = zod.infer<typeof schema>

type NavigationProps = NativeStackNavigationProp<
  RootSAuthParamList,
  'singUpFirstStep'
>

export function SignIn() {
  const { navigate } = useNavigation<NavigationProps>()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'michael@smith.com',
      password: '123456',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  async function submit(data: zodSchema) {
    const { email, password } = data
    try {
      setIsLoading(true)

      await signIn({ email, password })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao realizar login. Tente novamente mais tarde'

      toast.error(title)
    } finally {
      setIsLoading(false)
    }
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
            <View className="mt-5 flex-1 justify-between px-5">
              {/* Logo e Subtítulo */}
              <View className="mt-12 items-center">
                <Image source={require('@assets/logo-so-nome.png')} alt="" />
                <Text className="text-md mt-2 text-center font-bold text-white">
                  Treine sua mente e domine o seu corpo.
                </Text>
              </View>

              {/* Formulário */}
              <View className="mt-11">
                <Text className="mb-6 text-center text-lg font-bold text-white">
                  Acesse sua conta
                </Text>

                <InputFormControl
                  control={control}
                  name="email"
                  label="E-mail"
                  keyboardType="email-address"
                  inputClasses="bg-neutral-900 text-white"
                  error={errors.email}
                  autoCapitalize="none"
                  autoCorrect={false}
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
                  loading={isLoading}
                />
              </View>

              {/* Footer */}
              <View className="mb-10">
                <Text className="mb-3 text-center text-base text-white">
                  Não possui conta?
                </Text>
                <Button
                  label="Criar conta"
                  variant="outline"
                  onPress={() => navigate('singUpFirstStep')}
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
