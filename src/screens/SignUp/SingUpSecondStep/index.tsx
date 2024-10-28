import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Heading } from '@components/Heading'
import { SelecFormControlt } from '@components/SelecFormControlt'
import { TextAreaFormControl } from '@components/TextAreaFormControl'
import { Button } from '@components/ui/Button'
import { InputFormControl } from '@components/ui/InputFormControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootSAuthParamList } from '@routes/auth.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import zod from 'zod'

import { Bullet } from '../__components__/Bullet'

const nivel = [
  {
    value: 'Sedentario (Trabalho de escritório)',
    label: 'Sedentario (Trabalho de escritório)',
  },
  { value: 'Leve (1-2 dias/semana)', label: 'Leve (1-2 dias/semana)' },
  { value: 'Moderado (3-5 dias/semana)', label: 'Moderado (3-5 dias/semana)' },
  { value: 'Pesado (6-7 dias/semana)', label: 'Pesado (6-7 dias/semana)' },
  { value: 'Atleta (2x/dia)', label: 'Atleta (2x/dia)' },
]

const objectives = [
  { value: 'Perda de peso', label: 'Perda de peso' },
  { value: 'Ganho de massa muscular', label: 'Ganho de massa muscular' },
  { value: 'Aumento de força', label: 'Aumento de força' },
  {
    value: 'Melhora da resistência cardiovascular',
    label: 'Melhora da resistência cardiovascular',
  },
  { value: 'Definição muscular', label: 'Definição muscular' },
  { value: 'Aumento da flexibilidade', label: 'Aumento da flexibilidade' },
  { value: 'Preparação para competição', label: 'Preparação para competição' },
  { value: 'Reabilitação de lesões', label: 'Reabilitação de lesões' },
  { value: 'Saúde geral e bem-estar', label: 'Saúde geral e bem-estar' },
]
const didBodybuildingArray = [
  { value: '0', label: 'Sim' },
  { value: '1', label: 'Não' },
]

const schema = zod
  .object({
    weight: zod
      .string()
      .min(1, { message: 'O campo de nome é obrigatório' })
      .transform((value) => (value ? parseInt(value) : null)),
    didBodybuilding: zod.string().transform((val) => val === '0'),
    physicalActivityLevel: zod
      .string()
      .min(1, { message: 'O campo de nome é obrigatório' }),
    objective: zod
      .string()
      .min(1, { message: 'O campo de nome é obrigatório' }),
    medicalCondition: zod.string(),
    observations: zod.string(),
    password: zod.string().min(5),
    confirmPassword: zod.string().min(5),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'O campo de senha e confirma senha precisam ser iguais',
    path: ['confirmPassword'],
  })

export type zodSchema = zod.infer<typeof schema>

type IProps = {
  name?: string
  email?: string
  age?: number
  bornDate?: string
  phone?: string
}

type IRouteParams = {
  data: IProps
}

type NavigationProps = NativeStackNavigationProp<RootSAuthParamList, 'login'>

export function SingUpSecondStep() {
  const { goBack, navigate } = useNavigation<NavigationProps>()
  const route = useRoute()
  const { data } = route.params as IRouteParams
  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  async function submit(form: zodSchema) {
    const { name, email, phone, age, bornDate } = data

    const {
      password,
      objective,
      medicalCondition,
      observations,
      physicalActivityLevel,
      weight,
      didBodybuilding,
    } = form

    try {
      await api
        .post('/create-account', {
          name,
          email,
          phone,
          age,
          weight,
          bornDate: new Date(bornDate.split('/').reverse().join('-')),
          password,
          objective,
          didBodybuilding,
          physicalActivityLevel,
          medicalCondition,
          observations,
        })
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message)

            navigate('login')
          }
        })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : error.response?.data?.message ||
          'Ocorreu um erro. Tente novamente mais tarde!'

      console.error('Erro na criação de conta:', error)
      toast.error(title)
    }
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <HeaderGoBack title="Criar conta" />

          <Content>
            <View className="flex-row items-center">
              <Bullet />
              <Bullet active />
            </View>

            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
              keyboardShouldPersistTaps="handled">
              <View className="mt-3 flex-1 flex-col gap-4">
                <Heading title="2. Dados Técnicos" />

                <InputFormControl
                  control={control}
                  name="weight"
                  label="Peso"
                  error={errors.weight}
                  keyboardType="numeric"
                />

                <SelecFormControlt
                  control={control}
                  name="physicalActivityLevel"
                  label="Nivel Físico"
                  options={nivel}
                  error={errors.physicalActivityLevel}
                />

                <SelecFormControlt
                  control={control}
                  name="didBodybuilding"
                  label="Já treinou ?"
                  options={didBodybuildingArray}
                  error={errors.didBodybuilding}
                />

                <SelecFormControlt
                  control={control}
                  name="objective"
                  label="Objetivo"
                  options={objectives}
                  error={errors.objective}
                />

                <InputFormControl
                  control={control}
                  name="medicalCondition"
                  label="Condição Médica"
                  error={errors.medicalCondition}
                  multiline
                />

                <TextAreaFormControl
                  control={control}
                  name="observations"
                  label="Observações"
                  error={errors.observations}
                />

                <InputFormControl
                  control={control}
                  name="password"
                  label="Senha"
                  inputClasses="bg-neutral-900 text-white mt-4"
                  error={errors.password}
                  typePassword={true}
                  blurOnSubmit={false}
                  textContentType="oneTimeCode"
                />

                <InputFormControl
                  control={control}
                  name="confirmPassword"
                  label="Confirma Senha"
                  inputClasses="bg-neutral-900 text-white mt-4"
                  error={errors.confirmPassword}
                  typePassword={true}
                  blurOnSubmit={false}
                  textContentType="oneTimeCode"
                />
              </View>
            </ScrollView>
          </Content>

          <View
            style={{
              marginTop: 'auto',
              paddingHorizontal: 20,
              paddingBottom: getBottomSpace() + 60,
              gap: 20,
            }}>
            <Button label={'Salvar'} onPress={handleSubmit(submit)} />
            <Button label="Voltar" variant="outline" onPress={() => goBack()} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  )
}
