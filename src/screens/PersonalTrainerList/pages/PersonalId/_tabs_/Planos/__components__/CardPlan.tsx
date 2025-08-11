import React, { useContext, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Plan } from '@_dtos_/personalDTO'
import { Heading } from '@components/Heading'
import { Button } from '@components/ui/Button'
import { useOpenDialogAlert } from '@context/DialogAlertContext'
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
  personalId: string
  refetch: () => void
}

export function CardPlan({ item, planId, personalId, refetch }: IProps) {
  const { colorScheme } = useContext(ThemeContext)
  const [loading, setLoading] = useState(false)
  const { openDialogAlert } = useOpenDialogAlert()

  async function onSubmit(id: string) {
    console.log({
      personalId: personalId,
      planId: id,
    })
    try {
      setLoading(true)
      await api
        .post('/subscriptions', {
          personalId: personalId,
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
    openDialogAlert({
      title: 'Cancelar',
      message: 'Você realmente tem certeza que deseja cancelar seu plano ?',
      isButtonTitleConfirm: 'Ok',
      onConfirm: () => onCancelPlan(),
    })
  }

  return (
    <View className="gap-10 rounded-lg border border-input px-4 py-4">
      <View className="items-center gap-2 py-10">
        <Text className="primary_regular text-[16px] text-foreground">
          {item.name}
        </Text>
        <View className="flex-row items-baseline">
          <Text className="text-sm text-primary">R$</Text>
          <Text className="font-primary_bold text-[60px] text-foreground">
            {item.price}
          </Text>
          <Text className="ml-1 text-sm text-primary">/mes</Text>
        </View>
      </View>

      <View className="justify-center gap-4">
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
