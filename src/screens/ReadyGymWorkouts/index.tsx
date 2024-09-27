import React, { useEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ItemplateDTO } from '@_dtos_/templateDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Header } from '@components/Header'
import { Loading } from '@components/Loading'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

import { ButtonCategories } from './__components__/ButtonCategories'
import { CardWorkouts } from './__components__/CardWorkouts'

export function ReadyGymWorkouts() {
  const { navigate } = useNavigation()

  const categories = [
    'Musculação',
    'Calistenia',
    'Crossfit',
    'Street workout',
    'Yoga',
  ]

  // const workoutsReady: ItemplateDTO[] = [
  //   {
  //     id: '1',
  //     title: 'Treinos recomendados',
  //     training: [
  //       {
  //         id: '1',
  //         title: 'Treino de pernas',
  //         level: 'Avançado',
  //         tumbnail:
  //           'https://images.unsplash.com/photo-1675026482808-33f7515ecddd?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       },
  //       {
  //         id: '2',
  //         title: 'Treino de ombros',
  //         level: 'Avançado',
  //         tumbnail:
  //           'https://images.unsplash.com/photo-1579758682665-53a1a614eea6?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       },
  //       {
  //         id: '3',
  //         title: 'Treino de ombros',
  //         level: 'Avançado',
  //         tumbnail:
  //           'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     title: 'Guias de tecnicas',
  //     training: [
  //       {
  //         id: '1',
  //         title: 'Treino de biceps',
  //         level: 'Intermediário',
  //         tumbnail:
  //           'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       },
  //       {
  //         id: '2',
  //         title: 'Treino de costas',
  //         level: 'Intermediário',
  //         tumbnail:
  //           'https://images.unsplash.com/photo-1659350774685-04b709a54863?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D',
  //       },
  //       {
  //         id: '3',
  //         title: 'Treino de costas',
  //         level: 'Intermediário',
  //         tumbnail:
  //           'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       },
  //     ],
  //   },
  //   {
  //     id: '3',
  //     title: 'HIIT',
  //     training: [
  //       {
  //         id: '1',
  //         title: 'Treino de core',
  //         level: 'Iniciante',
  //         tumbnail:
  //           'https://plus.unsplash.com/premium_photo-1664109999840-3f7e97489e53?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       },
  //       {
  //         id: '2',
  //         title: 'Treino de costas',
  //         level: 'Intermediário',
  //         tumbnail:
  //           'https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJlaW5vJTIwZGUlMjBoaWl0fGVufDB8fDB8fHww',
  //       },
  //       {
  //         id: '3',
  //         title: 'Treino de costas',
  //         level: 'Intermediário',
  //         tumbnail:
  //           'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       },
  //     ],
  //   },
  // ]

  function handleNavigaDetails(title: string) {
    navigate('detailsTemplate', {
      title,
    })
  }

  const { data, error, isLoading } = useQuery<ItemplateDTO>({
    queryKey: ['get-training-templates'],
    queryFn: async () => {
      const { data } = await api.get('/training-programs')

      return data as ItemplateDTO
    },
  })

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao buscar os treinos. Tente novamente mais tarde'

      toast.error(title)
    }
  }, [error])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Header title={'Programas de treino'} />
          <Content>
            <ScrollView
              contentContainerStyle={{
                gap: 12,
              }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}>
                {categories.map((item, index) => (
                  <ButtonCategories key={index} label={item} active={false} />
                ))}
              </ScrollView>

              <View>
                {data &&
                  Object.entries(data.workoutsByPersonal).map(
                    ([key, workouts]) => {
                      const personalName =
                        workouts[0]?.personal?.user?.name ||
                        'Personal Desconhecido'

                      return (
                        <View key={key} className="mb-3 pb-4">
                          <View className="flex-row gap-3 items-center justify-between">
                            <View className="flex-row gap-3 items-center">
                              <Image
                                className="h-10 w-10 rounded-full"
                                source={{
                                  uri: workouts[0]?.personal?.user?.avatarUrl,
                                }}
                                alt=""
                              />
                              <Text className="text-white py-5 font-primary_bold text-base">
                                {personalName}
                              </Text>
                            </View>
                            <TouchableOpacity>
                              <Text className="text-primary py-5 font-primary_bold text-base">
                                Ver Todos
                              </Text>
                            </TouchableOpacity>
                          </View>

                          {/* Nome do personal */}
                          <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 12 }}>
                            {workouts.map((training) => (
                              <CardWorkouts
                                key={training.id}
                                training={training}
                                onNavigate={handleNavigaDetails}
                              />
                            ))}
                          </ScrollView>
                        </View>
                      )
                    },
                  )}
              </View>

              {/* {data.workoutsByPersonal.map((item) => (
              <View key={item.id} className="gap-4">
                <Heading title={item.title} />
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 12 }}>
                  {item.training.map((training) => (
                    <CardWorkouts
                      key={training.id}
                      training={training}
                      onNavigate={handleNavigaDetails}
                    />
                  ))}
                </ScrollView>
              </View>
            ))} */}
            </ScrollView>
          </Content>
        </Container>
      )}
    </>
  )
}
