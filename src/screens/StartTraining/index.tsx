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
import { NoContent } from '@components/NoContent'
import { SubTitle } from '@components/SubTitle'
import { VideoPlayerWithThumbnail } from '@components/VideoPlayerWithThumbnail'
import { useOpenDialogAlert } from '@context/DialogAlertContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import {
  getCurrentWorkoutStorage,
  removeCurrentWorkoutFromStorage,
  removeStartWorkoutromStorage,
} from '@storage/index'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { extractVideoId } from '@utils/extractVideoId'
import { onFinallyWorkoutTime } from '@utils/formatDate'
import { toast } from '@utils/toast-methods'
import dayjs from 'dayjs'

import { useWorkout } from '../../context/WorkoutContext'

import CardExercise from './__components__/CardExercise'
import { Row } from './__components__/Row'
import { SkeletonAnimation } from './__components__/SkeletonAnimation'
import TimerWithSound from './__components__/Timer'
import { UpdateWeight } from './__components__/UpdateWeight'

type IRouteParams = {
  id: string
  name: string
  exclusive: boolean
  weekDays: Day[]
}

export function StartTraining() {
  const route = useRoute()

  const { goBack, navigate } = useNavigation()
  const { onSetCurrentWorkout, onSetCurrentWorkoutUpdate } = useWorkout()
  const queryClient = useQueryClient()

  const [playing, setPlaying] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<StartExerciseDTO | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [exercises, setExercises] = useState<StartExerciseDTO[]>([])
  const [selectedItems, setSelectedItems] = useState([])
  const currentWorkout = getCurrentWorkoutStorage()
  const { openDialogAlert, closeDialog } = useOpenDialogAlert()

  const { name, id, exclusive, weekDays } = route.params as IRouteParams

  const { data, isFetching } = useQuery<StartExerciseDTO[]>({
    queryKey: ['get-training-for-workoutid', id],
    queryFn: async () => {
      const { data } = await api.get(`/workout/${id}`)

      setExercises(data?.exerciseConfig)

      return data?.exerciseConfig
    },
  })

  function handleSelectedVideo(item, index) {
    const number = index + 1
    const newItem = {
      ...item,
      number,
    }

    setSelectedVideo(newItem)
    setPlaying(!playing)

    onSetCurrentWorkoutUpdate({
      id,
      name,
      exercise: newItem,
    })
  }

  const toggleSelectItem = (selectedItem: StartExerciseDTO) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.some(
        (item) => item.exerciseId === selectedItem.id,
      )

      if (isAlreadySelected) {
        // Remove o item se já estiver selecionado
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
          thumbnail: selectedItem.exerciseThumb,
          exerciseTitle: selectedItem.exerciseTitle,
          exerciseId: selectedItem.id,
        }

        // Adiciona o novo item ao array
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
                title: 'Sucesso',
                message: response.data.message,
                isButtonTitleConfirm: 'Ok',
                onConfirm: () => closeDialog(),
              })
              goBack()
            }
          })
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'
        toast.error(title)
      } finally {
        removeStartWorkoutromStorage()
        removeCurrentWorkoutFromStorage()
      }
    }

    if (selectedItems.length != data.length) {
      toast.error('Atenção, Você precisa marcar os exercícios para continuar.')
    }
  }

  function getUpdateWeight(weight: string) {
    const parsedWeight = parseInt(weight, 10) // Fazer parse uma vez só

    const updatedExercises = exercises.map((exercise, index) => {
      if (exercise.id === selectedVideo?.id) {
        const updatedExercise = { ...exercise, load: parsedWeight }
        handleSelectedVideo(updatedExercise, index) // Chama a função com o item alterado
        return updatedExercise
      }
      return exercise
    })

    setExercises(updatedExercises)
  }

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
        : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'

      toast.error(title)
    }
  }

  function handleDeleteWorkout() {
    !exclusive
      ? openDialogAlert({
          title: 'Apagar Treino',
          message: 'Você realmente deseja apagar este treino ?',
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
          message: 'Você realmente deseja editar este treino ?',
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

  return (
    <Container>
      <HeaderGoBack
        title={name}
        isMenu
        onDeleteWorkout={handleDeleteWorkout}
        onEditWorkout={handleEditWorkout}
      />
      <Content>
        {isFetching ? (
          <SkeletonAnimation />
        ) : (
          <>
            {exercises.length > 0 ? (
              <>
                <View>
                  {selectedVideo && (
                    <VideoPlayerWithThumbnail
                      thumbnailUrl={selectedVideo?.exerciseThumb}
                      videoId={
                        selectedVideo?.exerciseVideo != undefined &&
                        extractVideoId(selectedVideo?.exerciseVideo)
                      }
                    />
                  )}

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
                      title={'Editar Carga ?'}
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

                <View className="flex-row justify-between pb-2">
                  <Text className="text-[14px] text-foreground">
                    {selectedVideo?.exerciseTitle}
                  </Text>

                  <Text className="text-[14px] text-muted-foreground">
                    Exercício {selectedVideo?.number} de {data?.length}
                  </Text>
                </View>

                <FlatList
                  data={exercises}
                  keyExtractor={(item) => item.id}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                  initialNumToRender={5}
                  contentContainerStyle={
                    exercises?.length == 0
                      ? { flexGrow: 1 }
                      : { paddingBottom: 30, gap: 12 }
                  }
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

                {currentWorkout?.id == id ? (
                  <Footer
                    label="Concluir Treino"
                    paddingHorizontal={0}
                    onSubmit={() => handleFinishTraining()}
                  />
                ) : (
                  <Footer
                    label="Iniciar Treino"
                    paddingHorizontal={0}
                    onSubmit={() => {
                      onSetCurrentWorkout({
                        id,
                        name,
                        exercise: selectedVideo,
                      })
                    }}
                  />
                )}
              </>
            ) : (
              <NoContent message="Nenhum exercício cadastrado no momento. Aguarde seu personal !" />
            )}
          </>
        )}
      </Content>

      <ModalWithContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Adicionar Carga"
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
