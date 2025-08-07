import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { ProgramsTrainingDTO } from '@_dtos_/programsTraining'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { InputWithButton } from '@components/InputWithButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CardWorkouts } from '@screens/WorkoutsTemplates/__components__/CardWorkouts'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

import { SkeletonAnimation } from './__components__/SkeletonAnimation'
import { RootStackParamList } from '@routes/stack.routes'

type IRouteParams = {
  title: string
  id: string
}

export function WorkoutAll() {
  const route = useRoute()
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { title, id } = route.params as IRouteParams

  function handleNavigaDetails(title: string, id: string, tumbnail: string) {
    navigate('workoutId', {
      title,
      id,
      tumbnail,
    })
  }

  const [workoutAll, setworkoutAll] = useState<ProgramsTrainingDTO[]>(null)
  const [originalworkoutAll, setOriginalworkoutAll] = useState<
    ProgramsTrainingDTO[]
  >([])

  const { error, isFetching } = useQuery({
    queryKey: ['get-all-training-workout-free', id],
    queryFn: async () => {
      const { data } = await api.get(`/programs/${id}`)

      setworkoutAll(data.data)
      setOriginalworkoutAll(data.data)

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

  function getSearchWorkout(title: string) {
    const newItem = [...workoutAll]

    if (title.length > 0) {
      const tipoInfo = newItem.filter((item) =>
        item.name.toLowerCase().includes(title.toLowerCase()),
      )

      setworkoutAll(tipoInfo)
    } else {
      setworkoutAll(originalworkoutAll)
    }
  }

  return (
    <Container>
      <HeaderGoBack title={title} />
      <Content>
        {isFetching ? (
          <SkeletonAnimation />
        ) : (
          <>
            <InputWithButton
              label="Nome do treino/exercício"
              iconName="Search"
              size={20}
              onChangeText={(name) => getSearchWorkout(name)}
              onNavigate={(name) => getSearchWorkout(name)}
            />
            <FlatList
              data={workoutAll}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardWorkouts
                  training={item}
                  isFullWidth
                  onNavigate={handleNavigaDetails}
                />
              )}
              contentContainerStyle={{ gap: 12, paddingBottom: 80 }}
            />
          </>
        )}
      </Content>
    </Container>
  )
}
