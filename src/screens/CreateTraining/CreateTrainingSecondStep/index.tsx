import React, { useState } from 'react'
import { FlatList, Text } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { ModalWithContent } from '@components/ModalWithContent'
import { useNavigation, useRoute } from '@react-navigation/native'
import { toast } from '@utils/toast-methods'

import { Form } from '../__components__/Form'
import { StepHeader } from '../__components__/StepHeader'

import { Card } from './__components__/Card'
import { ConfigExercises, IData } from './__components__/ConfigExercises'

type IRouteParams = {
  title: string
  selectedItems: IExercise[] | null
}

export function CreateTrainingSecondStep() {
  const route = useRoute()
  const { navigate } = useNavigation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { title, selectedItems } = route.params as IRouteParams

  const [exercises, setExercises] = useState<IExercise[] | []>(selectedItems)
  const [exerciseConfig, setexerciseConfig] = useState<IExercise>(
    {} as IExercise,
  )

  const allWeightsFilled =
    exercises &&
    exercises.every((exercise) => exercise?.load && exercise?.load > 0)

  function handleOpenModal(item: IExercise) {
    setIsModalOpen(!isModalOpen)
    setexerciseConfig(item)
  }

  function onUpdateExercises(id: string, data: IData, changeAll: boolean) {
    const newItem: IExercise[] = [...exercises]

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
      <HeaderGoBack title={'Criar Treino'} />
      <Form>
        <StepHeader title={title} current={2} />

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
            <Card
              item={item}
              key={item.id}
              openModal={() => handleOpenModal(item)}
            />
          )}
        />
      </Form>

      <Footer
        label="Próxima Etapa"
        onSubmit={() => {
          if (allWeightsFilled) {
            navigate('createTrainingThirdStep', {
              title,
              selectedItems: exercises,
            })
          } else {
            toast.error('Existem exercícios com o peso não preenchido.')
          }
        }}
      />

      <ModalWithContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Configuração do exercício"
        content={
          <ConfigExercises
            item={exerciseConfig}
            onUpdateExercises={onUpdateExercises}
          />
        }
      />
    </Container>
  )
}
