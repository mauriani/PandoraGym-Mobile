import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { ButtonWithIcon } from '@components/ButtonWithIcon'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { IconComponent } from '@components/IconComponent'
import { ModalWithContent } from '@components/ModalWithContent'
import { SubTitle } from '@components/SubTitle'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { VideoPlayerWithThumbnail } from '@components/VideoPlayerWithThumbnail'
import { useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'

import { CardExercise } from './__components__/CardExercise'
import { Row } from './__components__/Row'
import TimerWithSound from './__components__/Timer'

type IRouteParams = {
  id: string
  name: string
}

export function StartTraining() {
  const intervalRef = useRef(null)
  const route = useRoute()
  const [playing, setPlaying] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<StartExerciseDTO | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const isSelected = (id) => selectedItems.includes(id)

  const [selectedItems, setSelectedItems] = useState([])

  const { name, id } = route.params as IRouteParams

  const { data } = useQuery<StartExerciseDTO[]>({
    queryKey: ['get-training-for-workoutid', id],
    queryFn: async () => {
      const { data } = await api.get(`/workout/${id}`)

      return data?.exerciseConfig
    },
  })

  const extractVideoId = (url) => {
    const match = url.match(/v=([^&]+)/)
    return match ? match[1] : null
  }

  function handleSelectedVideo(item, index) {
    const number = index + 1
    const newItem = {
      ...item,
      number,
    }
    setSelectedVideo(newItem)
    setPlaying(!playing)
  }

  const toggleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      // Se o item já está selecionado, remove-o
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((itemId) => itemId !== id)
      }
      // Caso contrário, adiciona o ID ao array
      return [...prevSelectedItems, id]
    })
  }

  function handleFinishTraining() {
    console.log('seconds', seconds)

    console.log('selectedItems', selectedItems)
  }

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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevMinutes) => prevMinutes + 1)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <Container>
      <HeaderGoBack title={name} />
      <Content>
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

          <View className="flex-row justify-between bg-accent py-5 px-3 mt-[10px] rounded-b-[6px]">
            <Row>
              <IconComponent iconName="Dumbbell" />
              <SubTitle title={`${selectedVideo?.sets} séries`} />
            </Row>

            <Row>
              <IconComponent iconName="Repeat" />
              <SubTitle title={`${selectedVideo?.reps} séries`} />
            </Row>

            <Row>
              <IconComponent iconName="Weight" />
              <SubTitle title={`${selectedVideo?.load}`} />
            </Row>
          </View>

          <View className="flex-row items-center py-2 gap-4">
            <TimerWithSound
              initialSeconds={
                selectedVideo?.restTimeBetweenSets != undefined &&
                selectedVideo?.restTimeBetweenSets
              }
            />
            <ButtonWithIcon
              title={'Editar Carga utilizada ?'}
              iconName="Weight"
              onPress={() => setIsModalOpen(!isModalOpen)}
            />
          </View>
        </View>

        <View className="flex-row justify-between pb-2">
          <Text className="text-foreground text-[14px]">
            {selectedVideo?.exerciseTitle}
          </Text>

          <Text className="text-muted-foreground text-[14px]">
            Exercício {selectedVideo?.number} de {data?.length}
          </Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            data?.length == 0 ? { flexGrow: 1 } : { paddingBottom: 30, gap: 12 }
          }
          renderItem={({ item, index }) => (
            <CardExercise
              item={item}
              index={index}
              onSectedVideo={handleSelectedVideo}
              toggleSelectItem={toggleSelectItem}
              isSelected={isSelected(item.id)}
            />
          )}
        />

        {selectedItems.length == data?.length && (
          <View
            style={{ marginTop: 'auto', paddingBottom: getBottomSpace() + 25 }}>
            <Button
              label="Concluir Treino"
              onPress={() => handleFinishTraining()}
            />
          </View>
        )}
      </Content>

      <ModalWithContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Adicionar Carga"
        content={
          <View className="gap-5 py-3">
            <Input label="Carga kg" />

            <Button label="Salvar" />
          </View>
        }
      />
    </Container>
  )
}
