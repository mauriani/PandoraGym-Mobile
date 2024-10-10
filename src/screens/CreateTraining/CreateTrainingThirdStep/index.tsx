import React from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View } from 'react-native'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { NoContent } from '@components/NoContent'
import { InputFormControl } from '@components/ui/InputFormControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import { useQueryClient } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import { daysOfWeek } from '@utils/weekDay'
import zod from 'zod'

import { CardExercise } from '../__components__/CardExercise'
import { Form } from '../__components__/Form'
import { MultiSelect } from '../__components__/MultiSelect'
import { StepHeader } from '../__components__/StepHeader'

type IRouteParams = {
  title: string
  selectedItems: IExercise[] | null
}

const schema = zod.object({
  name: zod.string({ required_error: 'Campo obrigatório!' }).nullable(),
  week: zod.array(zod.string()),
})

export type zodSchema = zod.infer<typeof schema>

export function CreateTrainingThirdStep() {
  const route = useRoute()
  const queryClient = useQueryClient()
  const { navigate } = useNavigation()
  const { title, selectedItems } = route.params as IRouteParams

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  async function submit(data: zodSchema) {
    const { name, week } = data

    try {
      await api
        .post('/create-workout', {
          name,
          thumbnail: selectedItems[0].exerciseThumb,
          exercises: selectedItems,
          weekDays: week,
        })
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message)

            // Invalide a query para que ela seja recarregada com os novos dados
            queryClient.invalidateQueries({
              queryKey: ['get-training-for-user'],
            })

            navigate('tabNavigator')
          }
        })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'

      toast.error(title)
    }
  }

  return (
    <Container>
      <HeaderGoBack title={'Criar Treino'} />
      <Form>
        <StepHeader title={title} current={3} />

        <View>
          <InputFormControl
            control={control}
            name="name"
            placeholder="Nome do treino"
            label="Nome do treino"
            error={errors.name}
            defaultValue={title}
          />

          <MultiSelect
            options={daysOfWeek}
            name={'week'}
            control={control}
            label="Selecione os dias que você faz esse treino ?"
          />
        </View>

        <Text className="text-foreground font-primary_bold text-base">
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

      <Footer label="Concluir" onSubmit={handleSubmit(submit)} />
    </Container>
  )
}
