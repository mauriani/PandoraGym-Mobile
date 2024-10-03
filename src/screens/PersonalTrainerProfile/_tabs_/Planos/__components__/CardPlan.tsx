import React, { useContext } from 'react'
import { Alert, Text, View } from 'react-native'
import { Plan } from '@_dtos_/personalDTO'
import { Heading } from '@components/Heading'
import { Button } from '@components/ui/Button'
import { useNavigation } from '@react-navigation/native'
import { TitleSection } from '@screens/PersonalTrainerProfile/__components__/TitleSection'
import { api } from '@services/api'
import { useQueryClient } from '@tanstack/react-query'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { AppError } from '@utils/AppError'
import { CheckCheck } from 'lucide-react-native'

type IProps = {
  item: Plan
  planId: string
}

export function CardPlan({ item, planId }: IProps) {
  const { colorScheme } = useContext(ThemeContext)
  const queryClient = useQueryClient()
  const { navigate } = useNavigation()

  async function onSubmit(id: string) {
    try {
      await api
        .post('/subscribe-to-plan', {
          personalId: item.personalId,
          planId: id,
        })
        .then((response) => {
          if (response.status == 200) {
            Alert.alert(response.data.message)

            queryClient.invalidateQueries({
              queryKey: ['get-list-personal'],
            })

            navigate('tabNavigator')
          }
        })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'

      Alert.alert(title)
    }
  }

  async function onCancelPlan() {
    try {
      await api
        .post('/cancel-plan', {
          personalId: item.personalId,
          planId,
        })
        .then((response) => {
          if (response.status == 200) {
            Alert.alert(response.data.message)

            queryClient.invalidateQueries({
              queryKey: ['get-list-personal'],
            })

            navigate('tabNavigator')
          }
        })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'

      Alert.alert(title)
    }
  }

  function handleHeIsSure() {
    Alert.alert(
      'Cancelar',
      'Você realmente tem certeza que deseja cancelar seu plano ?',
      [
        {
          text: 'Sim',
          onPress: () => onCancelPlan(),
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  return (
    <View className="gap-10 border border-input rounded-lg py-4 px-4">
      <View className="items-center gap-2 py-10">
        <Text className="text-foreground primary_regular text-[16px]">
          {item.name}
        </Text>
        <View className="flex-row items-baseline">
          <Text className="text-sm text-primary">R$</Text>
          <Text className="text-foreground font-primary_bold text-[60px]">
            {item.price}
          </Text>
          <Text className="text-sm text-primary ml-1">/mes</Text>
        </View>
      </View>

      <View className="gap-4 justify-center">
        <Heading title="Recursos Básicos" />
        {item.description.map((benefit, index) => (
          <View key={index} className="flex-row items-center gap-2">
            <CheckCheck
              size={16}
              color={themes[colorScheme].primary}
              fill={themes[colorScheme].primary}
            />
            <TitleSection title={benefit} />
          </View>
        ))}
      </View>

      <View className="gap-3">
        <Button
          onPress={() => onSubmit(item.id)}
          variant={
            planId != null && planId == item.id ? 'secondary' : 'default'
          }
          label={
            planId != null && planId == item.id
              ? 'Plano Contratado'
              : 'Contratar'
          }
        />

        {planId != null && planId == item.id && (
          <Button
            variant={'destructive'}
            label={'Cancelar Plano'}
            onPress={() => handleHeIsSure()}
          />
        )}
      </View>
    </View>
  )
}
