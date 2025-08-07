import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { Day } from '@_dtos_/trainingDTO'
import { ButtonWithIcon } from '@components/ButtonWithIcon'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Footer } from '@components/Footer'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { IconComponent } from '@components/IconComponent'
import { ModalWithContent } from '@components/ModalWithContent'
import { SubTitle } from '@components/SubTitle'
import { VideoPlayerWithThumbnail } from '@components/VideoPlayerWithThumbnail'
import { useOpenDialogAlert } from '@context/DialogAlertContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { api } from '@services/api'
import {
  getCurrentWorkoutStorage,
  removeCurrentWorkoutFromStorage,
  removeStartWorkoutromStorage,
} from '@storage/index'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { extractVideoId } from '@utils/extractVideoId'
import { onFinallyWorkoutTime } from '@utils/formatDate'
import { toast } from '@utils/toast-methods'
import dayjs from 'dayjs'

import { useWorkout } from '../../../context/WorkoutContext'
import { RootStackParamList } from '../../../routes/stack.routes'

import CardExercise from '../__components__/CardExercise'
import { ProgressBar } from '../__components__/ProgressBar'
import { Row } from '../__components__/Row'
import { SkeletonAnimation } from '../__components__/SkeletonAnimation'
import TimerWithSound from '../__components__/Timer'
import { UpdateWeight } from '../__components__/UpdateWeight'

type IRouteParams = {
  id: string
  name: string
  exclusive: boolean
  weekDays: Day[]
}

export function WorkoutExecutionScreen() {
  const route = useRoute()
  const { goBack } = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { onSetCurrentWorkoutUpdate } = useWorkout()
  const { openDialogAlert, closeDialog } = useOpenDialogAlert()

  const [playing, setPlaying] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<StartExerciseDTO | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [exercises, setExercises] = useState<StartExerciseDTO[]>([])
  const [selectedItems, setSelectedItems] = useState([])
  const currentWorkout = getCurrentWorkoutStorage()

  const { name, id } = route.params as IRouteParams

  const { data, isFetching } = useQuery<StartExerciseDTO[]>({
    queryKey: ['get-training-for-workoutid', id],
    queryFn: async () => {
      const { data } = await api.get(`/workouts/${id}`)
      setExercises(data?.exercises)
      return data?.exercises
    },
  })

  function handleSelectedVideo(item, index) {
    const number = index + 1
    const newItem = {
      ...item,
      currentWorkoutNumber: number,
    }

    setSelectedVideo(newItem)
    setPlaying(!playing)

    if (item.workoutId == currentWorkout?.id) {
      onSetCurrentWorkoutUpdate({
        id,
        name,
        exercise: newItem,
      })
    }
  }

  const toggleSelectItem = (selectedItem: StartExerciseDTO) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.some(
        (item) => item.exerciseId === selectedItem.id,
      )

      if (isAlreadySelected) {
        return prevSelectedItems.filter(
          (item) => item.exerciseId !== selectedItem.id,
        )
      } else {
        const newItem = {
          workoutId: selectedItem.workoutId,
          executionTime: dayjs().toISOString(),
          weight: selectedItem.load,
          sets: selectedItem.sets.toString(),
          reps: selectedItem.reps.toString(),
          restTime: selectedItem.restTimeBetweenSets,
          thumbnail: selectedItem.thumbnail,
          exerciseTitle: selectedItem.name,
          exerciseId: selectedItem.id,
        }

        return [...prevSelectedItems, newItem]
      }
    })
  }

  async function handleFinishTraining() {
    const seconds = onFinallyWorkoutTime()

    if (selectedItems.length == data.length) {
      try {
        await api
          .post('workout/finish', {
            timeTotalWorkout: seconds,
            exercise: selectedItems,
          })
          .then((response) => {
            if (response.status == 200) {
              openDialogAlert({
                title: 'Parabéns! 🎉',
                message: 'Treino concluído com sucesso! Continue assim para alcançar seus objetivos.',
                isButtonTitleConfirm: 'Ok',
                onConfirm: () => {
                  closeDialog()
                  goBack()
                },
              })
            }
          })
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde!'
        toast.error(title)
      } finally {
        removeStartWorkoutromStorage()
        removeCurrentWorkoutFromStorage()
      }
    } else {
      toast.error('Atenção, você precisa marcar todos os exercícios para continuar.')
    }
  }

  function getUpdateWeight(weight: string) {
    const parsedWeight = parseInt(weight, 10)

    const updatedExercises = exercises.map((exercise, index) => {
      if (exercise.id === selectedVideo?.id) {
        const updatedExercise = { ...exercise, load: parsedWeight }
        handleSelectedVideo(updatedExercise, index)
        return updatedExercise
      }
      return exercise
    })

    setExercises(updatedExercises)
  }

  const handleToggleSelectItem = useCallback(
    (item) => {
      toggleSelectItem(item)
    },
    [toggleSelectItem],
  )

  useEffect(() => {
    if (data) {
      const newItem = {
        ...data[0],
        number: 1,
      }
      if (data.length > 0) {
        setSelectedVideo(newItem)
        setPlaying(true)
      }
    }
  }, [data])

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

  return (
    <Container>
      <HeaderGoBack title={`Executando: ${name}`} />
      
      <Content>
        {/* Progress Indicator */}
        <ProgressBar 
          current={selectedItems.length}
          total={data?.length || 0}
        />

        {/* Current Exercise Video */}
        {selectedVideo && (
          <View className="mb-4">
            <VideoPlayerWithThumbnail
              thumbnailUrl={selectedVideo?.thumbnail}
              videoId={
                selectedVideo?.videoUrl != undefined &&
                extractVideoId(selectedVideo?.videoUrl)
              }
            />

            <View className="mt-[10px] flex-row justify-between rounded-b-[6px] bg-accent px-3 py-5">
              <Row>
                <IconComponent iconName="Dumbbell" />
                <SubTitle title={`${selectedVideo?.sets} séries`} />
              </Row>

              <Row>
                <IconComponent iconName="Repeat" />
                <SubTitle title={`${selectedVideo?.reps} repetições`} />
              </Row>

              <Row>
                <IconComponent iconName="Weight" />
                <SubTitle title={`${selectedVideo?.load}kg`} />
              </Row>
            </View>

            <View className="flex-row items-center justify-between gap-4 py-2">
              <ButtonWithIcon
                title={'Editar Carga'}
                iconName="Weight"
                onPress={() => setIsModalOpen(!isModalOpen)}
              />

              <TimerWithSound
                initialSeconds={
                  selectedVideo?.restTimeBetweenSets != undefined &&
                  selectedVideo?.restTimeBetweenSets
                }
              />
            </View>
          </View>
        )}

        {/* Current Exercise Info */}
        <View className="flex-row justify-between pb-4 mb-4 border-b border-border">
          <Text className="text-lg font-semibold text-foreground">
            {selectedVideo?.name}
          </Text>

          <Text className="text-sm text-muted-foreground">
            Exercício {selectedVideo?.currentWorkoutNumber} de {data?.length}
          </Text>
        </View>

        {/* Exercise List */}
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          contentContainerStyle={{ paddingBottom: 30, gap: 12 }}
          renderItem={({ item, index }) => (
            <CardExercise
              item={item}
              index={index}
              onSectedVideo={handleSelectedVideo}
              isSelected={selectedItems.some(
                (selectedItem) => selectedItem.exerciseId === item.id,
              )}
              toggleSelectItem={handleToggleSelectItem}
            />
          )}
        />
      </Content>

      {/* Finish Workout Button */}
      <Footer
        label={`Concluir Treino (${selectedItems.length}/${data?.length || 0})`}
        paddingHorizontal={0}
        onSubmit={handleFinishTraining}
      />

      {/* Update Weight Modal */}
      <ModalWithContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Editar Carga"
        content={
          <UpdateWeight
            weight={selectedVideo?.load}
            getUpdateWeight={getUpdateWeight}
            onClose={() => setIsModalOpen(!isModalOpen)}
            loading={false}
          />
        }
      />
    </Container>
  )
}
