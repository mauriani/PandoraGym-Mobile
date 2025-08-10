import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View, ScrollView } from 'react-native'
import { IDetailsTemplate } from '@_dtos_/detailsTemplateDTO'
import { ButtonWithIcon } from '@components/ButtonWithIcon'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Footer } from '@components/Footer'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Heading } from '@components/Heading'
import { IconComponent } from '@components/IconComponent'
import { ModalWithContent } from '@components/ModalWithContent'
import { Button } from '@components/ui/Button'
import { VideoPlayerWithThumbnail } from '@components/VideoPlayerWithThumbnail'
import { useAuth } from '@hooks/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MultiSelect } from '@screens/CreateTraining/__components__/MultiSelect'
import { api } from '@services/api'
import { getTokenPlanStorage } from '@storage/index'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { extractVideoId } from '@utils/extractVideoId'
import { secondsToHourMinute } from '@utils/formatTime'
import { toast } from '@utils/toast-methods'
import { daysOfWeek } from '@utils/weekDay'
import zod from 'zod'

import { CardDetails } from './__components__/CardDetails'
import { PersonalTrainerInfo } from './__components__/PersonalTrainerInfo'
import { PremiumBadge } from './__components__/PremiumBadge'
import { SkeletonAnimation } from './__components__/SkeletonAnimation'
import { SubscriptionPrompt } from './__components__/SubscriptionPrompt'
import { WorkoutStats } from './__components__/WorkoutStats'
import { RootStackParamList } from '@routes/stack.routes'

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
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false)
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const { title, id, tumbnail } = route.params as IRouteParams

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const { handleSubmit, control, reset } = methods

  const { data, error, isFetching } = useQuery<IDetailsTemplate>({
    queryKey: ['get-training-workout-free', id],
    queryFn: async () => {
      const { data } = await api.get(`/programs/${id}`)
      return data
    },
  })

  // Verificar se o usuário tem plano ativo
  const userPlanId = getTokenPlanStorage()
  const hasActivePlan = Boolean(userPlanId)
  
  // Verificar se o treino requer assinatura (assumindo que treinos com personal requerem plano)
  const requiresSubscription = Boolean(data?.data?.personal?.id)
  const canAccessWorkout = !requiresSubscription || hasActivePlan

  // Limitar preview para não assinantes (mostrar apenas 2 exercícios)
  const exercisesToShow = canAccessWorkout 
    ? data?.data?.exerciseConfig 
    : data?.data?.exerciseConfig?.slice(0, 2)

  const totalExercises = data?.data?.exerciseConfig?.length || 0
  const hiddenExercisesCount = totalExercises - (exercisesToShow?.length || 0)

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao buscar os treinos. Tente novamente mais tarde'

      toast.error(title)
    }
  }, [error])

  function handleUseWorkout() {
    if (!canAccessWorkout) {
      setShowSubscriptionPrompt(true)
      return
    }
    setIsModalOpen(true)
  }

  function handleUpgradePlan() {
    if (data?.data?.personal?.id) {
      navigate('personalId', {
        id: data.data.personal.id,
      })
    }
    setShowSubscriptionPrompt(false)
  }

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
            queryClient.invalidateQueries({
              queryKey: ['get-training-for-user'],
            })

            reset({ week: null })
            setIsModalOpen(false)
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

  if (isFetching) {
    return (
      <Container>
        <HeaderGoBack title="Carregando..." />
        <Content>
          <SkeletonAnimation />
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <HeaderGoBack title={title} />
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header com vídeo e badge premium */}
          <View className="relative">
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
            
            {requiresSubscription && (
              <View className="absolute top-2 right-2">
                <PremiumBadge />
              </View>
            )}
          </View>

          {/* Stats Section */}
          <WorkoutStats
            duration={secondsToHourMinute(data?.data?.totalDuration)}
            calories={data?.data?.totalCalories}
            exercises={totalExercises}
            level={data?.data?.level}
            isPremium={requiresSubscription}
          />

          {/* Personal Trainer Info */}
          {data?.data?.personal?.id && (
            <PersonalTrainerInfo
              personal={data.data.personal}
              onViewProfile={() =>
                navigate('personalId', {
                  id: data.data.personal.id,
                })
              }
            />
          )}

          {/* Descrição */}
          <View className="gap-2 mb-4">
            <Text
              numberOfLines={canAccessWorkout ? undefined : 2}
              className="font-primary_regular text-sm text-white">
              {data?.data?.description}
            </Text>

            {!canAccessWorkout && (
              <Text className="font-primary_regular text-xs text-muted-foreground italic">
                Descrição completa disponível apenas para assinantes
              </Text>
            )}
          </View>

          {/* Seção de Exercícios */}
          <View className="gap-2 mb-4">
            <View className="flex-row items-center justify-between">
              <Heading title={'Exercícios'} />
              {requiresSubscription && (
                <View className="flex-row items-center gap-1">
                  <IconComponent iconName="Crown" size={16} color="#FFD700" />
                  <Text className="text-xs text-yellow-500 font-medium">
                    Premium
                  </Text>
                </View>
              )}
            </View>

            {!canAccessWorkout && (
              <View className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-3">
                <View className="flex-row items-center gap-2 mb-1">
                  <IconComponent iconName="Info" size={16} color="#EAB308" />
                  <Text className="text-yellow-500 font-medium text-sm">
                    Preview Limitado
                  </Text>
                </View>
                <Text className="text-yellow-500/80 text-xs">
                  Mostrando {exercisesToShow?.length} de {totalExercises} exercícios. 
                  Assine um plano para ver todos os exercícios.
                </Text>
              </View>
            )}
          </View>

          {/* Lista de Exercícios */}
          <View className="gap-3 mb-4">
            {exercisesToShow?.map((item, index) => (
              <CardDetails 
                key={item.id} 
                item={item} 
                isPremium={requiresSubscription}
                isBlurred={false}
              />
            ))}
            
            {hiddenExercisesCount > 0 && (
              <View className="bg-secondary/50 border-2 border-dashed border-muted rounded-lg p-6 items-center justify-center">
                <IconComponent iconName="Lock" size={32} color="#6B7280" />
                <Text className="text-muted-foreground font-medium mt-2">
                  +{hiddenExercisesCount} exercícios bloqueados
                </Text>
                <Text className="text-muted-foreground text-sm text-center mt-1">
                  Assine um plano para desbloquear todos os exercícios
                </Text>
              </View>
            )}
          </View>

          {/* Informações do Personal (se houver) */}
          {data?.data?.personal?.id && (
            <View className="bg-secondary/30 rounded-lg p-4 mb-6">
              <View className="flex-row items-center gap-2 mb-2">
                <IconComponent iconName="User" size={20} color="#10B981" />
                <Text className="text-white font-medium">
                  Treino Personalizado
                </Text>
              </View>
              <Text className="text-muted-foreground text-sm">
                Este treino foi criado por um personal trainer certificado. 
                Para acessar todos os treinos personalizados, assine um plano.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Footer Button */}
        <Footer
          label={canAccessWorkout ? "Usar Treino" : "Ver Planos"}
          paddingHorizontal={0}
          onSubmit={handleUseWorkout}
        />
      </Content>

      {/* Modal para seleção de dias */}
      <ModalWithContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Em qual dia você realizará esse treino?"
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

      {/* Modal de Prompt de Assinatura */}
      <SubscriptionPrompt
        isVisible={showSubscriptionPrompt}
        onClose={() => setShowSubscriptionPrompt(false)}
        onUpgrade={handleUpgradePlan}
        workoutTitle={title}
        personalId={data?.data?.personal?.id}
      />
    </Container>
  )
}
