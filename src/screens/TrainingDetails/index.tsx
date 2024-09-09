import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { IconComponent } from '@components/IconComponent'
import { Button } from '@components/ui/Button'
import { VideoPlayerWithThumbnail } from '@components/VideoPlayerWithThumbnail'
import { useRoute } from '@react-navigation/native'

import { CardExercise } from './__components__/CardExercise'
import { Row } from './__components__/Row'
import { SubTitle } from './__components__/SubTitle'
import TimerWithSound from './__components__/Timer'

type IRouteParams = {
  id_exercise: string
  name: string
}

export function TrainingDetails() {
  const route = useRoute()
  const [playing, setPlaying] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<StartExerciseDTO | null>(
    null,
  )
  const isSelected = (id) => selectedItems.includes(id)

  const [selectedItems, setSelectedItems] = useState([])

  const { name } = route.params as IRouteParams

  const treinoPernas = [
    {
      id: '1',
      nome: 'Agachamento Livre',
      repeticoes: 12,
      time: 45,
      numero_series: 4,
      video_url:
        'https://www.youtube.com/watch?v=s7i94Okznns&ab_channel=RodrigoZagoTreinador',
      carga: '80kg',
      thumbnail:
        'https://images.unsplash.com/photo-1662045010188-b5e91a7f504b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3F1YXQlMjBmaXRuZXNzfGVufDB8fDB8fHww',
    },
    {
      id: '2',
      nome: 'Leg Press',
      repeticoes: 15,
      time: 50,
      numero_series: 4,
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      carga: '200kg',
      thumbnail:
        'https://images.unsplash.com/photo-1675026482808-33f7515ecddd?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '3',
      nome: 'Afundo',
      repeticoes: 12,
      time: 40,
      numero_series: 3,
      video_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      carga: '60kg',
      thumbnail:
        'https://uniguacu.com.br/wp-content/uploads/2024/02/afundo-scaled.jpg',
    },
    {
      id: '4',
      nome: 'Cadeira Extensora',
      repeticoes: 12,
      time: 60,
      numero_series: 3,
      video_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      carga: '70kg',
      thumbnail:
        'https://alexandrebento.com.br/wp-content/uploads/2023/08/cadeira-extensora.jpg',
    },
    {
      id: '5',
      nome: 'Stiff',
      repeticoes: 10,
      time: 60,
      numero_series: 4,
      video_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      carga: '50kg',
      thumbnail:
        'https://image.tuasaude.com/media/article/jj/hd/stiff_62843_l.jpg',
    },
  ]

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
  useEffect(() => {
    const newItem = {
      ...treinoPernas[0],
      number: 1,
    }
    if (treinoPernas.length > 0) {
      setSelectedVideo(newItem)
      setPlaying(true)
    }
  }, [])

  const disabled = false

  console.log('selectedItems', selectedItems)

  return (
    <Container>
      <HeaderGoBack title={name} />
      <View className="flex-1 px-5 mt-10">
        <View className="px-5">
          {selectedVideo && (
            <VideoPlayerWithThumbnail
              thumbnailUrl={selectedVideo?.thumbnail}
              videoId={
                selectedVideo?.video_url != undefined &&
                extractVideoId(selectedVideo?.video_url)
              }
            />
          )}

          <View className="flex-row justify-between bg-accent py-5 px-3 mt-[-50px] rounded-b-[6px]">
            <Row>
              <IconComponent iconName="Dumbbell" />
              <SubTitle title={`${selectedVideo?.numero_series} séries`} />
            </Row>

            <Row>
              <IconComponent iconName="Repeat" />
              <SubTitle title={`${selectedVideo?.repeticoes} séries`} />
            </Row>

            <Row>
              <IconComponent iconName="Weight" />
              <SubTitle title={`${selectedVideo?.carga}`} />
            </Row>
          </View>

          <View className="flex-row justify-between items-center py-2">
            <TimerWithSound
              initialSeconds={
                selectedVideo?.time != undefined && selectedVideo?.time
              }
            />

            <Text className="text-muted-foreground tex-[14]">
              Exercício {selectedVideo?.number} de {treinoPernas?.length}
            </Text>
          </View>
        </View>

        <FlatList
          data={treinoPernas}
          keyExtractor={(item) => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            treinoPernas?.length == 0
              ? { flexGrow: 1 }
              : { paddingBottom: 30, gap: 12 }
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

        {selectedItems.length == treinoPernas?.length && (
          <View
            style={{ marginTop: 'auto', paddingBottom: getBottomSpace() + 25 }}>
            <Button
              label="Concluir Treino"
              disabled={true}
              activeOpacity={disabled ? 0.5 : 1}
            />
          </View>
        )}
      </View>
    </Container>
  )
}
