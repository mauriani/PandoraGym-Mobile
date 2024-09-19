import React, { useEffect, useState } from 'react'
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
import { MyTrainingCard } from '@components/MyTrainingCard'
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
  const { navigate } = useNavigation()
  const [title, setTitle] = useState('')
  const { user } = useAuth()

  function handleNavigate() {
    if (title?.length == 0) {
      toast.error('Para continuar informe o titulo do treino')
    } else {
      navigate('createTrainingFirstStep', {
        title,
      })

      setTitle('')
    }
  }

  function handleAccessTraining(id_exercise: string, name: string) {
    navigate('startTraining', {
      id_exercise,
      name,
    })
  }

  const { data, error } = useQuery<ITraining[]>({
    queryKey: ['get-training-for-user', user.token],
    queryFn: async () => {
      const { data } = await api.get('/workouts')

      return data?.workouts
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
  }, [])

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Header title={'Meus Treinos'} />
          <Content>
            <Heading title="Criar Treino" />

            <InputWithIcon
              label="Nome do treino/exercício"
              iconName="Plus"
              size={20}
              onChangeText={(text) => setTitle(text)}
              onNavigate={handleNavigate}
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
              renderItem={({ item }) => (
                <MyTrainingCard
                  item={item}
                  onAccessTraining={handleAccessTraining}
                />
              )}
            />
          </Content>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  )
}
