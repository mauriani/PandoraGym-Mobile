import { useState } from 'react'
import { FlatList, Text } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { ModalWithContent } from '@components/ModalWithContent'
import { useRoute } from '@react-navigation/native'
import { Form } from '@screens/CreateTraining/__components__/Form'
import {
  ConfigExercises,
  IData,
} from '@screens/CreateTraining/CreateTrainingSecondStep/__components__/ConfigExercises'
import { toast } from '@utils/toast-methods'

import { CardEditWorkout } from './__components__/CardEditWorkout'
import { ConfigExercisesEdit } from './__components__/ConfigExercisesEdit'

type IRouteParams = {
  // title: string
  selectedItems: StartExerciseDTO[] | null
}

export function EditWorkout() {
  const route = useRoute()
  const { selectedItems } = route.params as IRouteParams

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [exercises, setExercises] = useState<StartExerciseDTO[] | []>(
    selectedItems,
  )
  const [exerciseConfig, setexerciseConfig] = useState<StartExerciseDTO>(
    {} as StartExerciseDTO,
  )

  function handleOpenModal(item: StartExerciseDTO) {
    setIsModalOpen(!isModalOpen)
    setexerciseConfig(item)
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
          item.restTimeBetweenSets = data.restTimeBetweenSets
          item.sets = data.sets
        }
      })

      toast.success(`${name} Alterada com sucesso!`)
    } else {
      newItem.forEach((item) => {
        item.load = data.load
        item.reps = data.reps
        item.restTimeBetweenSets = data.restTimeBetweenSets
        item.sets = data.sets
      })

      toast.success(`Todos os exercícios alterados com sucesso!`)
    }

    setExercises(newItem)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <Container>
      <HeaderGoBack title="Editar Treino" />
      <Form>
        <Text className="text-muted-foreground font-primary_regular tex-[16]">
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
      </Form>

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
    </Container>
  )
}
