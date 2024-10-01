import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { Plan } from '@_dtos_/personalDTO'
import { Heading } from '@components/Heading'
import { Button } from '@components/ui/Button'
import { TitleSection } from '@screens/PersonalTrainerProfile/__components__/TitleSection'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { CheckCheck } from 'lucide-react-native'

type IProps = {
  item: Plan
  planId: string
}

export function CardPlan({ item, planId }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  const benefits = item.description.split(',').map((benefit) => benefit.trim())

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
        {benefits.map((b, index) => (
          <View key={index} className="flex-row items-center gap-2">
            <CheckCheck
              size={16}
              color={themes[colorScheme].primary}
              fill={themes[colorScheme].primary}
            />
            <TitleSection title={b} />
          </View>
        ))}
      </View>

      <Button
        variant={planId != null && planId == item.id ? 'secondary' : 'default'}
        label={
          planId != null && planId == item.id ? 'Plano Contratado' : 'Contratar'
        }
      />
    </View>
  )
}
