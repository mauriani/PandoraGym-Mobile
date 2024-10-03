import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
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
import { useNavigation } from '@react-navigation/native'
import zod from 'zod'

import { Bullet } from '../__components__/Bullet'

const nivel = [
  {
    value: '0',
    label: 'Sedentario (Trabalho de escritório)',
  },
  { value: '1', label: 'Leve (1-2 dias/semana)' },
  { value: '2', label: 'Moderado (3-5 dias/semana)' },
  { value: '3', label: 'Pesado (6-7 dias/semana)' },
  { value: '4', label: 'Atleta (2x/dia)' },
]

const objectives = [
  { value: '1', label: 'Perda de peso' },
  { value: '2', label: 'Ganho de massa muscular' },
  { value: '3', label: 'Aumento de força' },
  { value: '4', label: 'Melhora da resistência cardiovascular' },
  { value: '5', label: 'Definição muscular' },
  { value: '6', label: 'Aumento da flexibilidade' },
  { value: '7', label: 'Preparação para competição' },
  { value: '8', label: 'Reabilitação de lesões' },
  { value: '9', label: 'Saúde geral e bem-estar' },
]

const schema = zod
  .object({
    weight: zod.string().min(1, { message: 'O campo de nome é obrigatório' }),
    physicalActivityLevel: zod
      .string()
      .min(1, { message: 'O campo de nome é obrigatório' }),
    objective: zod
      .string()
      .min(1, { message: 'O campo de nome é obrigatório' }),
    medicalCondition: zod.string(),
    observations: zod.string(),
    password: zod.string().min(6),
    confirmPassword: zod.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'O campo de senha e confirma senha precisam ser iguais',
    path: ['confirmPassword'],
  })

export type zodSchema = zod.infer<typeof schema>

export function SingUpSecondStep() {
  const { goBack } = useNavigation()
  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  function submit(data: zodSchema) {
    console.log(data)
  }

  return (
    <Container>
      <HeaderGoBack title="Criar conta" />

      <Content>
        <View className="flex-row items-center">
          <Bullet />
          <Bullet active />
        </View>

        <View className="flex-1 flex-col mt-3 gap-4">
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
          />

          <InputFormControl
            control={control}
            name="confirmPassword"
            label="Confirma Senha"
            inputClasses="bg-neutral-900 text-white mt-4"
            error={errors.confirmPassword}
            typePassword={true}
          />
        </View>

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
      </Content>
    </Container>
  )
}
