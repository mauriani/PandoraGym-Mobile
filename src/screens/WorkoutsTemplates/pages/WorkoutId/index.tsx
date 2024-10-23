import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View } from 'react-native'
import { IDetailsTemplate } from '@_dtos_/detailsTemplateDTO'
import { ButtonWithIcon } from '@components/ButtonWithIcon'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Footer } from '@components/Footer'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Heading } from '@components/Heading'
import { ModalWithContent } from '@components/ModalWithContent'
import { Button } from '@components/ui/Button'
import { VideoPlayerWithThumbnail } from '@components/VideoPlayerWithThumbnail'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MultiSelect } from '@screens/CreateTraining/__components__/MultiSelect'
import { api } from '@services/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { extractVideoId } from '@utils/extractVideoId'
import { secondsToHourMinute } from '@utils/formatTime'
import { toast } from '@utils/toast-methods'
import { daysOfWeek } from '@utils/weekDay'
import zod from 'zod'

import { CardDetails } from './__components__/CardDetails'
import { SkeletonAnimation } from './__components__/SkeletonAnimation'

type IRouteParams = {
  title: string
  id: string
  tumbnail: string
}

const schema = zod.object({
  week: zod.array(zod.string()),
})

export type zodSchema = zod.infer<typeof schema>

export function WorkoutId() {
  const route = useRoute()
  const { navigate } = useNavigation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const { title, id, tumbnail } = route.params as IRouteParams

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const { handleSubmit, control, reset } = methods

  const { data, error, isFetching } = useQuery<IDetailsTemplate>({
    queryKey: ['get-training-workout-free', id],
    queryFn: async () => {
      const { data } = await api.get(`/training-programs/${id}`)

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

  async function submit(form: zodSchema) {
    const { week } = form
    const { exerciseConfig } = data?.data

    try {
      await api
        .post('/create-workout', {
          name: title,
          thumbnail: tumbnail,
          exercises: exerciseConfig,
          weekDays: week,
        })
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message)
            // Invalide a query para que ela seja recarregada com os novos dados
            queryClient.invalidateQueries({
              queryKey: ['get-training-for-user'],
            })

            reset({ week: null })
            setIsModalOpen(!isModalOpen)
            navigate('tabNavigator')
          }
        })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'

      toast.error(title)
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
            {data?.data?.personal?.id && (
              <View className="flex-row items-center py-5">
                <VideoPlayerWithThumbnail
                  thumbnailUrl={data?.data?.thumbnail}
                  videoId={
                    data?.data?.personal?.presentationVideo != undefined &&
                    extractVideoId(data?.data?.personal?.presentationVideo)
                  }
                />
              </View>
            )}

            <View className="flex-row mb-4 gap-3">
              <ButtonWithIcon
                title={`${secondsToHourMinute(data?.data?.totalDuration)}`}
                iconName="Clock1"
              />

              <ButtonWithIcon
                title={`${data?.data?.totalCalories}Cal`}
                iconName="Flame"
              />

              {data?.data?.personal?.id && (
                <ButtonWithIcon
                  title={'Perfil'}
                  iconName="User"
                  onPress={() =>
                    navigate('personalId', {
                      id: data?.data?.personal?.id,
                    })
                  }
                />
              )}
            </View>

            <View className="gap-2">
              <Text
                numberOfLines={2}
                className="text-white font-primary_regular text-sm">
                {data?.data?.description}
              </Text>

              <Heading title={'Exercícios'} />
            </View>

            <FlatList
              data={data?.data?.exerciseConfig}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                data?.data?.exerciseConfig?.length == 0
                  ? {
                      flexGrow: 1,
                      padding: 10,
                    }
                  : { paddingBottom: 60, gap: 12 }
              }
              renderItem={({ item }) => (
                <CardDetails key={item.id} item={item} />
              )}
            />

            <Footer
              label="Usar Treino"
              paddingHorizontal={0}
              onSubmit={() => setIsModalOpen(!isModalOpen)}
            />
          </>
        )}
      </Content>

      <ModalWithContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Em qual dia você realizará esse treino ?"
        content={
          <View className="gap-5 py-3">
            <MultiSelect
              options={daysOfWeek}
              name={'week'}
              control={control}
              label="Selecione o dia"
            />

            <Button label="Salvar" onPress={handleSubmit(submit)} />
          </View>
        }
      />
    </Container>
  )
}
