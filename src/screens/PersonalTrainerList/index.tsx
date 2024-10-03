import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { IPersonalList } from '@_dtos_/personalListDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Header } from '@components/Header'
import { Loading } from '@components/Loading'
import { Input } from '@components/ui/Input'
import { useAuth } from '@hooks/auth'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

import { Card } from './__components__/Card'

export function PersonalTrainerList() {
  const { navigate } = useNavigation()
  const { user } = useAuth()

  const [personalTrainers, setPersonalTrainers] =
    useState<IPersonalList[]>(null)
  const [originalPersonalTrainers, setOriginalPersonalTrainers] = useState<
    IPersonalList[]
  >([])

  const { error, isLoading } = useQuery<IPersonalList[]>({
    queryKey: ['get-list-personal'],
    queryFn: async () => {
      const { data } = await api.get('/list-personal')

      setPersonalTrainers(data.data)
      setOriginalPersonalTrainers(data.data)
      return data.data
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

  function getSearchPersonal(title: string) {
    const newItem: IPersonalList[] = [...personalTrainers]

    if (title.length > 0) {
      const tipoInfo = newItem.filter((item) =>
        item.user.name.toLowerCase().includes(title.toLowerCase()),
      )

      setPersonalTrainers(tipoInfo)
    } else {
      setPersonalTrainers(originalPersonalTrainers)
    }
  }

  function isStudentInList(item: IPersonalList) {
    const studentInList = item.student.find(
      (student) => student.id === user?.user?.id,
    )

    if (studentInList) {
      return studentInList.plan?.id
    }

    return null
  }

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
              <Header title={'Personal trainers'} />

              <Content>
                <Input
                  label="Buscar personal"
                  className="mb-2"
                  onChangeText={(text) => getSearchPersonal(text)}
                />
                <FlatList
                  data={personalTrainers}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={
                    personalTrainers?.length == 0
                      ? {
                          flexGrow: 1,
                          padding: 10,
                        }
                      : { paddingBottom: 30, gap: 12, paddingTop: 10 }
                  }
                  renderItem={({ item }) => (
                    <Card
                      key={item.id}
                      item={item}
                      onPress={() =>
                        navigate('personalId', {
                          id: item.id,
                          planId: isStudentInList(item),
                        })
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
