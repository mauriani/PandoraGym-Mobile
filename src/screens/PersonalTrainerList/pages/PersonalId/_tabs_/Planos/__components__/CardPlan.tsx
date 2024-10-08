import React, { useContext, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Plan } from '@_dtos_/personalDTO'
import { Heading } from '@components/Heading'
import { Button } from '@components/ui/Button'
import { api } from '@services/api'
import { savePlanInStorage } from '@storage/index'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import { CheckCheck } from 'lucide-react-native'

import { TitleSection } from '../../../__components__/TitleSection'

type IProps = {
  item: Plan
  planId: string
  refetch: () => void
}

export function CardPlan({ item, planId, refetch }: IProps) {
  const { colorScheme } = useContext(ThemeContext)
  const [loading, setLoading] = useState(false)

  async function onSubmit(id: string) {
    try {
      setLoading(true)
      await api
        .post('/subscribe-to-plan', {
          personalId: item.personalId,
          planId: id,
        })
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message)
            savePlanInStorage(id)
            refetch()
          }
        })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'

      Alert.alert(title)
    } finally {
      setLoading(false)
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
            toast.success(response.data.message)
            savePlanInStorage(null)

            refetch()
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
          loading={loading}
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
