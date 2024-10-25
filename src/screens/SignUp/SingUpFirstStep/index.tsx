import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Heading } from '@components/Heading'
import { InputMaskControl } from '@components/InputMaskControl'
import { InputFormControl } from '@components/ui/InputFormControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootSAuthParamList } from '@routes/auth.routes'
import { Footer } from '@screens/CreateTraining/__components__/Footer'
import { isValid, parse } from 'date-fns'
import zod from 'zod'

import { Bullet } from '../__components__/Bullet'

const dateFormat = 'dd/mm/yyyy'
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

const schema = zod.object({
  name: zod
    .string()
    .min(1, { message: 'O campo de nome é obrigatório' })
    .refine((value) => value.trim().includes(' '), {
      message: 'O campo precisa do nome completo.',
    }),
  email: zod
    .string()
    .min(1, { message: 'O campo de e-mail é obrigatório' })
    .email(),
  age: zod
    .string()
    .min(1, { message: 'O campo de idade é obrigatório' })
    .transform((value) => (value ? parseInt(value) : null)),
  bornDate: zod.string({ required_error: 'Campo obrigatório!' }).refine(
    (value) => {
      // Check if the date string matches the regex pattern
      const matchesFormat = dateRegex.test(value)
      if (!matchesFormat) {
        console.log('Date string does not match the expected format')
        return false
      }

      // Parse the date string and check if it is valid
      const parsedDate = parse(value, dateFormat, new Date())
      const isValidDate = isValid(parsedDate)

      return isValidDate
    },
    {
      message: 'Data inválida, deve estar no formato dd/MM/yyyy',
    },
  ),
  phone: zod.string().min(1, { message: 'O campo de nome é obrigatório' }),
})

export type zodSchema = zod.infer<typeof schema>

type NavigationProps = NativeStackNavigationProp<
  RootSAuthParamList,
  'singUpSecondStep'
>

export function SingUpFirstStep() {
  const { navigate } = useNavigation<NavigationProps>()
  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  function submit(data: zodSchema) {
    Keyboard.dismiss()

    setTimeout(() => {
      navigate('singUpSecondStep', {
        data,
      })
    }, 200)
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <HeaderGoBack title="Criar conta" />

          <Content>
            <View className="flex-row items-center">
              <Bullet active />
              <Bullet />
            </View>

            <View className="flex-1 flex-col mt-3 gap-4">
              <Heading title="1. Dados Pessoais" />

              <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
                keyboardShouldPersistTaps="handled">
                <View className="flex-1 flex-col mt-3 gap-4">
                  <InputFormControl
                    control={control}
                    name="name"
                    label="Nome"
                    error={errors.name}
                    autoCorrect={false}
                  />

                  <InputFormControl
                    control={control}
                    name="email"
                    label="E-mail"
                    error={errors.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <InputMaskControl
                    control={control}
                    name="phone"
                    label="Telefone"
                    error={errors.phone}
                    type="phone"
                  />

                  <InputFormControl
                    control={control}
                    name="age"
                    label="Idade"
                    error={errors.age}
                    keyboardType="numeric"
                  />

                  <InputMaskControl
                    control={control}
                    name="bornDate"
                    label="Data de nascimento"
                    error={errors.bornDate}
                    type="date"
                  />
                </View>
              </ScrollView>
            </View>

            <Footer label="Próximo" onSubmit={handleSubmit(submit)} />
          </Content>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  )
}
