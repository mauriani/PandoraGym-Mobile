import React, { useEffect } from 'react'
import {
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { ITraining } from '@_dtos_/trainingDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'
import { InputWithIcon } from '@components/InputWithIcon'
import { Loading } from '@components/Loading'
import { MyTrainingCard } from '@components/MyTrainingCard'
import { NoContent } from '@components/NoContent'
import { useAuth } from '@hooks/auth'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import { z } from 'zod'

export const formValidationSchema = z.object({
  tituloTreino: z.string({ required_error: 'Campo obrigatório!' }).min(1, {
    message: 'Campo obrigatório!',
  }),
})

export type zodSchema = z.infer<typeof formValidationSchema>

export function Home() {
  const { user } = useAuth()
  const { navigate } = useNavigation()

  // console.log('userStorage', userStorage)
  // console.log('user', user)

  function handleAccessTraining(id: string, name: string, exclusive: boolean) {
    navigate('startTraining', {
      id,
      name,
      exclusive,
    })
  }

  const { data, error, isLoading } = useQuery<ITraining[]>({
    queryKey: ['get-training-for-user', user?.user?.id],
    queryFn: async () => {
      const { data } = await api.get('/workouts')

      return data
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
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={{ flex: 1 }}>
              <Header title={'Meus Treinos'} />
              <Content>
                <Heading title="Criar Treino" />

                <InputWithIcon
                  label="Nome do treino/exercício"
                  iconName="Plus"
                  size={20}
                />

                <Heading title="Meus Treinos" />

                <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={
                    data?.length == 0
                      ? {
                          flexGrow: 1,
                          padding: 10,
                        }
                      : { paddingBottom: 80, gap: 10 }
                  }
                  ListEmptyComponent={
                    <NoContent message="Opss ... você não tem nenhum treino cadastrado até o momento!" />
                  }
                  renderItem={({ item }) => (
                    <MyTrainingCard
                      item={item}
                      onAccessTraining={() =>
                        handleAccessTraining(item.id, item.name, item.exclusive)
                      }
                    />
                  )}
                />
              </Content>
            </View>
          </TouchableWithoutFeedback>
        </Container>
      )}
    </>
  )
}
