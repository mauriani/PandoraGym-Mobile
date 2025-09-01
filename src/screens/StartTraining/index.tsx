import React, { useContext, useState } from 'react'
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  ImageBackground,
  StyleSheet,
} from 'react-native'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { Day, ITraining } from '@_dtos_/trainingDTO'
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
import { HeaderTraining } from './__components__/HeaderTraining'

type IRouteParams = {
  item: ITraining
}

export function PreWorkoutScreen() {
  const route = useRoute()

  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { onSetCurrentWorkout } = useWorkout()
  const queryClient = useQueryClient()
  const { openDialogAlert, closeDialog } = useOpenDialogAlert()

  const currentWorkout = getCurrentWorkoutStorage()
  const { item } = route.params as IRouteParams
  const { id, name, thumbnail, weekDays, exclusive } = item

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
      await api.delete(`/workouts/${id}`).then((response) => {
        if (response.status == 200) {
          toast.success('Treino excluído com sucesso!')
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
    return <ExercisePreviewItem item={item} index={index} />
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
    <View className="flex-1 bg-background">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <HeaderTraining
        durationInMinutes={durationInMinutes}
        estimatedCalories={estimatedCalories}
        exclusive={exclusive}
        name={name}
        handleDeleteWorkout={handleDeleteWorkout}
        handleEditWorkout={handleEditWorkout}
        image={thumbnail}
        totalExercises={totalExercises}
      />

      <FlatList
        data={exercises}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        ListHeaderComponent={
          <View className="pt-2">
            <View className="mb-4">
              <WorkoutStats
                calories={estimatedCalories}
                exercises={totalExercises}
                duration={durationInMinutes}
              />
            </View>

            {/* Section Header */}
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">
                Exercícios
              </Text>
              <Text className="text-sm text-muted-foreground">
                {totalExercises} total
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <>
            <View className="mt-6 rounded-xl bg-accent p-4">
              <View className="mb-2 flex-row items-center">
                <IconComponent iconName="Lightbulb" size={16} />
                <Text className="ml-2 font-medium text-foreground">Dica</Text>
              </View>
              <Text className="text-sm text-muted-foreground">
                Faça um aquecimento de 5-10 minutos antes de iniciar o treino
                para melhor performance.
              </Text>
            </View>
          </>
        }
        renderItem={renderExerciseItem}
      />

      <Footer
        label={
          currentWorkout?.id === id ? 'Continuar Treino' : 'Iniciar Treino'
        }
        paddingHorizontal={16}
        onSubmit={handleStartWorkout}
      />
    </View>
  )
}
// Export with the name expected by the routes
export { PreWorkoutScreen as StartTraining }
export { WorkoutExecutionScreen } from './pages/WorkoutExecutionScreen'
