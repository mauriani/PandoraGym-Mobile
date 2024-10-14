import React, { useEffect } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
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

import { CardTop } from './__components__/CardTop'
import { CardWorkouts } from './__components__/CardWorkouts'

export function WorkoutsTemplates() {
  const { navigate } = useNavigation()

  function handleNavigaDetails(title: string, id: string, tumbnail: string) {
    navigate('workoutId', {
      title,
      id,
      tumbnail,
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
          <Header title={'Programas De Treino'} />
          <Content>
            <ScrollView
              contentContainerStyle={{
                gap: 12,
              }}>
              <CardTop image={''} personalName={'Treinos Recomendados'} />
              <FlatList
                data={data.workoutAdm}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <CardWorkouts
                    training={item}
                    onNavigate={handleNavigaDetails}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
              />
              <View>
                {data &&
                  Object.entries(data.workoutsByPersonal).map(
                    ([key, workouts]) => {
                      return (
                        <View key={key} className="mb-3 pb-4">
                          <CardTop
                            image={workouts[0]?.personal?.user?.avatarUrl}
                            personalName={workouts[0]?.personal?.user?.name}
                          />

                          <FlatList
                            data={workouts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                              <CardWorkouts
                                training={item}
                                onNavigate={() =>
                                  handleNavigaDetails(
                                    item.name,
                                    item.id,
                                    item.thumbnail,
                                  )
                                }
                              />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 12 }}
                          />
                        </View>
                      )
                    },
                  )}
              </View>
            </ScrollView>
          </Content>
        </Container>
      )}
    </>
  )
}
