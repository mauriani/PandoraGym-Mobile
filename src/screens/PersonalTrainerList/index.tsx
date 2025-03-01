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
import { Input } from '@components/ui/Input'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { getUserFromStorage, savePlanInStorage } from '@storage/index'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

import { Card } from './__components__/Card'
import { SkeletonAnimation } from './__components__/SkeletonAnimation'

export function PersonalTrainerList() {
  const { navigate } = useNavigation()

  const [personalTrainers, setPersonalTrainers] =
    useState<IPersonalList[]>(null)
  const [originalPersonalTrainers, setOriginalPersonalTrainers] = useState<
    IPersonalList[]
  >([])

  const { error, isFetching } = useQuery<IPersonalList[]>({
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
    const user = getUserFromStorage()

    const studentInList = item.student.find(
      (student) => student.id === user?.id,
    )

    if (studentInList) {
      if (studentInList?.plan?.id != null) {
        savePlanInStorage(studentInList?.plan?.id)
      }

      return studentInList.plan?.id
    }

    return null
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Header title={'Personal Trainers'} />

          {isFetching ? (
            <SkeletonAnimation />
          ) : (
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
                    onPress={() => {
                      isStudentInList(item)
                      navigate('personalId', {
                        id: item.id,
                      })
                    }}
                  />
                )}
              />
            </Content>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Container>
  )
}
