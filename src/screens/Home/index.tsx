import React, { useEffect } from 'react'
import {
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Day, ITraining } from '@_dtos_/trainingDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'
import { InputWithButton } from '@components/InputWithButton'
import { Loading } from '@components/Loading'
import { MyTrainingCard } from '@components/MyTrainingCard'
import { NoContent } from '@components/NoContent'
import { useAuth } from '@hooks/auth'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

export function Home() {
  const { user } = useAuth()
  const { navigate } = useNavigation()

  function handleAccessTraining(
    id: string,
    name: string,
    exclusive: boolean,
    weekDays: Day[],
  ) {
    navigate('startTraining', {
      id,
      name,
      exclusive,
      weekDays,
    })
  }

  function onNavigateCreateTraining(name) {
    navigate('createTrainingFirstStep', {
      title: name,
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

  useEffect(() => {
    SplashScreen.hide()
  }, [])

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

                <InputWithButton
                  label="Nome do treino/exercício"
                  iconName="Plus"
                  size={20}
                  onNavigate={onNavigateCreateTraining}
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
                        handleAccessTraining(
                          item.id,
                          item.name,
                          item.exclusive,
                          item.weekDays,
                        )
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
