import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { InputFormControl } from '@components/ui/InputFormControl'
import { FormSelect } from '@components/ui/Select'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { Bullet } from './__components__/Bullet'

const pesoArray = Array.from({ length: 141 }, (_, i) => i + 40) // De 40kg a 180kg
const alturaArray = Array.from({ length: 121 }, (_, i) => i + 100) // De 100cm a 220cm

const schema = zod.object({
  nome: zod.string().min(1, { message: 'O campo de nome é obrigatório' }),
  email: zod
    .string()
    .min(1, { message: 'O campo de Email é obrigatório' })
    .email(),
  password: zod.string().min(1, { message: 'O campo de Senha é obrigatório!' }),
})

export type zodSchema = zod.infer<typeof schema>

export function SignUp() {
  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    //  handleSubmit,
    control,
    formState: { errors },
  } = methods

  return (
    <Container>
      <HeaderGoBack title="Criar conta" />

      <Content>
        <View className="flex-row items-center">
          <Bullet active />
          <Bullet />
          <Bullet />
        </View>

        <View className="flex-1 flex-col mt-3 gap-4">
          <InputFormControl
            control={control}
            name="nome"
            label="Nome"
            error={errors.email}
          />

          <FormSelect />

          <InputFormControl
            control={control}
            name="nome"
            label="Nome"
            error={errors.email}
          />
        </View>

        {/* <Weight /> */}
      </Content>
    </Container>
  )
}
