import React from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text } from 'react-native'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { NoContent } from '@components/NoContent'
import { InputFormControl } from '@components/ui/InputFormControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRoute } from '@react-navigation/native'
import zod from 'zod'

import { CardExercise } from '../__components__/CardExercise'
import { Form } from '../__components__/Form'
import MultiSelect from '../__components__/MultiSelect'
import { StepHeader } from '../__components__/StepHeader'

type IRouteParams = {
  title: string
  selectedItems: IExercise[] | null
}

const schema = zod.object({
  name: zod
    .string({ required_error: 'Campo obrigatório!' })
    .min(1, {
      message: 'Campo obrigatório!',
    })
    .transform((value) => (value ? parseInt(value) : null))
    .nullable(),
})

export type zodSchema = zod.infer<typeof schema>

export function CreateTrainingThirdStep() {
  const route = useRoute()
  const { title, selectedItems } = route.params as IRouteParams

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    //   handleSubmit,
    control,
    formState: { errors },
  } = methods

  return (
    <Container>
      <HeaderGoBack title={'Criar Treino'} />
      <Form>
        <StepHeader title={title} current={3} />

        <InputFormControl
          control={control}
          name="name"
          placeholder="Nome do treino/exercício"
          label="Nome do treino/exercício"
          error={errors.name}
          defaultValue={title}
        />

        <MultiSelect />

        <Text className="text-foreground font-primary_bold tex-[16]">
          Listagem de exercícios
        </Text>

        <FlatList
          data={selectedItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            selectedItems?.length == 0
              ? {
                  flexGrow: 1,
                  padding: 10,
                }
              : { paddingBottom: 60, gap: 12 }
          }
          renderItem={({ item }) => <CardExercise item={item} />}
          ListEmptyComponent={
            <NoContent
              message={'Você não realizou nenghum treino nessa data !'}
            />
          }
        />
      </Form>
    </Container>
  )
}
