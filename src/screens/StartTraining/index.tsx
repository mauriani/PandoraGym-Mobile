import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { Day } from '@_dtos_/trainingDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Footer } from '@components/Footer'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { IconComponent } from '@components/IconComponent'
import { ModalWithContent } from '@components/ModalWithContent'
import { NoContent } from '@components/NoContent'
import { useOpenDialogAlert } from '@context/DialogAlertContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { api } from '@services/api'
import {
  getCurrentWorkoutStorage,
  removeCurrentWorkoutFromStorage,
  removeStartWorkoutromStorage,
} from '@storage/index'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import { useWorkout } from '@context/WorkoutContext'
import { RootStackParamList } from '@routes/stack.routes'
import { ExercisePreviewItem } from './__components__/ExercisePreviewItem'
import { SkeletonAnimation } from './__components__/SkeletonAnimation'
import { WorkoutStats } from './__components__/WorkoutStats'
import { Button } from '@components/ui/Button'

type IRouteParams = {
  id: string
  name: string
  exclusive: boolean
  weekDays: Day[]
}

export function PreWorkoutScreen() {
  const route = useRoute()
  const { navigate, goBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { onSetCurrentWorkout } = useWorkout()
  const queryClient = useQueryClient()
  const { openDialogAlert, closeDialog } = useOpenDialogAlert()

  const currentWorkout = getCurrentWorkoutStorage()
  const { name, id, exclusive, weekDays } = route.params as IRouteParams

  const { data: exercises, isFetching } = useQuery<StartExerciseDTO[]>({
    queryKey: ['get-training-for-workoutid', id],
    queryFn: async () => {
      const { data } = await api.get(`/workouts/${id}`)
      return data?.exercises
    },
  })

  // Calcular estatísticas do treino
  const totalExercises = exercises?.length || 0
  const estimatedDuration =
    exercises?.reduce((total, exercise) => {
      // Estimativa: (séries * tempo de descanso) + tempo base por exercício
      return total + exercise.sets * exercise.restTimeBetweenSets + 60 // 60s base por exercício
    }, 0) || 0

  const estimatedCalories = Math.round(estimatedDuration * 0.15) // Estimativa de calorias por segundo
  const durationInMinutes = Math.round(estimatedDuration / 60)

  async function onDeleteWorkout() {
    try {
      await api.delete(`/delete-workout/${id}`).then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message)
          queryClient.invalidateQueries({
            queryKey: ['get-training-for-user'],
          })
          if (currentWorkout?.id == id) {
            removeStartWorkoutromStorage()
            removeCurrentWorkoutFromStorage()
          }
          navigate('tabNavigator')
        }
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao apagar o treino. Tente novamente mais tarde!'
      toast.error(title)
    }
  }

  function handleDeleteWorkout() {
    !exclusive
      ? openDialogAlert({
          title: 'Apagar Treino',
          message: 'Você realmente deseja apagar este treino?',
          isButtonCancel: true,
          isButtonTitleConfirm: 'Sim, tenho certeza!',
          onConfirm: () => {
            onDeleteWorkout()
          },
        })
      : toast.error('Somente o seu personal pode alterar este treino!')
  }

  function handleEditWorkout() {
    !exclusive
      ? openDialogAlert({
          title: 'Editar Treino',
          message: 'Você realmente deseja editar este treino?',
          isButtonCancel: true,
          isButtonTitleConfirm: 'Sim, tenho certeza!',
          onConfirm: () =>
            navigate('editWorkout', {
              selectedItems: exercises,
              title: name,
              idWorkout: id,
              weekDays,
            }),
        })
      : toast.error('Somente o seu personal pode alterar este treino!')
  }

  function handleStartWorkout() {
    if (exercises && exercises.length > 0) {
      onSetCurrentWorkout({
        id,
        name,
        exercise: exercises[0],
      })

      navigate('workoutExecution', {
        id,
        name,
        exclusive,
        weekDays,
      })
    }
  }

  function renderExerciseItem({
    item,
    index,
  }: {
    item: StartExerciseDTO
    index: number
  }) {
    return (
      <ExercisePreviewItem
        item={item}
        index={index}
        onPress={() => {
          // Opcional: navegar para detalhes do exercício
        }}
      />
    )
  }

  if (isFetching) {
    return (
      <Container>
        <HeaderGoBack title="Carregando..." />
        <Content>
          <SkeletonAnimation />
        </Content>
      </Container>
    )
  }

  if (!exercises || exercises.length === 0) {
    return (
      <Container>
        <HeaderGoBack title={name} />
        <Content>
          <NoContent message="Nenhum exercício cadastrado no momento. Aguarde seu personal!" />
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <HeaderGoBack
        title={name}
        isMenu
        onDeleteWorkout={handleDeleteWorkout}
        onEditWorkout={handleEditWorkout}
      />

      <Content>
        <View className="relative mb-6">
          <Image
            source={{ uri: exercises[0]?.thumbnail }}
            className="h-48 w-full rounded-xl"
            resizeMode="cover"
          />
        </View>

        <Button
          label={
            currentWorkout?.id === id ? 'Continuar Treino' : 'Iniciar Treino'
          }
          onPress={handleStartWorkout}
        />

        {/* Workout Title and Info */}
        <View className="mb-6">
          <Text className="mb-2 text-2xl font-bold text-foreground">
            {name}
          </Text>
          <Text className="text-base text-muted-foreground">
            {durationInMinutes} min • {totalExercises} exercícios
          </Text>
        </View>

        {/* Stats Row */}
        <WorkoutStats
          calories={estimatedCalories}
          exercises={totalExercises}
          duration={durationInMinutes}
        />

        {/* Warm up section */}
        <View className="mb-4">
          <Text className="mb-2 text-sm text-muted-foreground">
            Aquecimento (5 minutos)
          </Text>
        </View>

        {/* Exercise List */}
        <View className="flex-1">
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={renderExerciseItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </Content>
    </Container>
  )
}
// Export with the name expected by the routes
export { PreWorkoutScreen as StartTraining }
export { WorkoutExecutionScreen } from './pages/WorkoutExecutionScreen'
