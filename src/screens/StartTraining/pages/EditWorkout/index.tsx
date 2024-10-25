import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { Day } from '@_dtos_/trainingDTO'
import { ButtonFab } from '@components/ButtonFab'
import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { ModalWithContent } from '@components/ModalWithContent'
import { InputFormControl } from '@components/ui/InputFormControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Form } from '@screens/CreateTraining/__components__/Form'
import { MultiSelect } from '@screens/CreateTraining/__components__/MultiSelect'
import { IData } from '@screens/CreateTraining/CreateTrainingSecondStep/__components__/ConfigExercises'
import { api } from '@services/api'
import { useQueryClient } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { timeStringToSeconds } from '@utils/formatTime'
import { toast } from '@utils/toast-methods'
import { daysOfWeek } from '@utils/weekDay'
import zod from 'zod'

import { AddExercise } from './__components__/AddExercise'
import { CardEditWorkout } from './__components__/CardEditWorkout'
import { ConfigExercisesEdit } from './__components__/ConfigExercisesEdit'

type IRouteParams = {
  selectedItems: StartExerciseDTO[] | null
  title: string
  idWorkout: string
  weekDays: Day[]
}

const schema = zod.object({
  name: zod.string({ required_error: 'Campo obrigatório!' }).nullable(),
  week: zod.array(zod.string()),
  search: zod.string().optional(),
})

export type zodSchema = zod.infer<typeof schema>

export function EditWorkout() {
  const route = useRoute()
  const { navigate } = useNavigation()
  const queryClient = useQueryClient()
  const { selectedItems, title, weekDays, idWorkout } =
    route.params as IRouteParams

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [exercises, setExercises] = useState<StartExerciseDTO[] | []>(
    selectedItems,
  )
  const [exerciseConfig, setexerciseConfig] = useState<StartExerciseDTO>(
    {} as StartExerciseDTO,
  )

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  function handleOpenModal(item: StartExerciseDTO) {
    setIsModalOpen(!isModalOpen)
    setexerciseConfig(item)
  }

  function updateExercises(newItems: StartExerciseDTO[]) {
    const updatedItems = newItems.map((item) => ({
      ...item,
      load: item.load == null ? 20 : item.load,
      restTimeBetweenSets:
        typeof item.restTimeBetweenSets === 'string'
          ? timeStringToSeconds(item.restTimeBetweenSets)
          : item.restTimeBetweenSets,
    }))

    setExercises([...exercises, ...updatedItems])
  }

  function onUpdateExercises(id: string, data: IData, changeAll: boolean) {
    const newItem: StartExerciseDTO[] = [...exercises]

    if (changeAll == false) {
      let name = ''

      newItem.forEach((item) => {
        name = item.exerciseTitle
        if (item.id === id) {
          item.load = data.load
          item.reps = data.reps
          item.restTimeBetweenSets = timeStringToSeconds(
            data.restTimeBetweenSets,
          )
          item.sets = data.sets
        }
      })

      toast.success(`${name} Alterada com sucesso!`)
    } else {
      newItem.forEach((item) => {
        item.load = data.load
        item.reps = data.reps
        item.restTimeBetweenSets = timeStringToSeconds(data.restTimeBetweenSets)
        item.sets = data.sets
      })

      toast.success(`Todos os exercícios alterados com sucesso!`)
    }

    setExercises(newItem)
    setIsModalOpen(!isModalOpen)
  }

  async function submit(form: zodSchema) {
    const { name, week } = form

    try {
      await api
        .put(`/update-workout/${idWorkout}`, {
          name,
          exercises,
          weekDays: week,
        })
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message)
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
      <HeaderGoBack title="Editar Treino" />
      <Form>
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
            defaultValue={weekDays}
          />
        </View>

        <Text className="font-primary_regular text-base text-muted-foreground">
          Clique no exercício para configura-lo.
        </Text>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: getBottomSpace() + 80,
            gap: 12,
          }}
          renderItem={({ item }) => (
            <CardEditWorkout
              item={item}
              key={item.id}
              openModal={() => handleOpenModal(item)}
            />
          )}
        />

        <ButtonFab onSubmit={() => setIsOpen(!isOpen)} iconName="PlusIcon" />
      </Form>

      <ModalWithContent
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        title="Adicionar Exercício"
        content={
          <AddExercise
            updateExercises={updateExercises}
            onClose={() => setIsOpen(!isOpen)}
          />
        }
      />

      <ModalWithContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Configuração do exercício"
        content={
          <ConfigExercisesEdit
            item={exerciseConfig}
            onUpdateExercises={onUpdateExercises}
          />
        }
      />

      <Footer label="Salvar Alterações" onSubmit={handleSubmit(submit)} />
    </Container>
  )
}
