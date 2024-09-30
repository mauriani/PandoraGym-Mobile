import { useContext } from 'react'
import { Text, View } from 'react-native'
import { IPersonalDTO } from '@_dtos_/personalDTO'
import { ContentScroll } from '@components/ContentScroll'
import { Heading } from '@components/Heading'
import { Button } from '@components/ui/Button'
import { TitleSection } from '@screens/PersonalTrainerProfile/__components__/TitleSection'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { CheckCheck } from 'lucide-react-native'

type IProps = {
  data: IPersonalDTO
}

export function Planos({ data }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  const planBenefits = [
    'Aulas de fitness em geral',
    'Dicas semanais de condicionamento físico',
    'Orientação básica de nutrição',
    'Preparação para Campeonatos',
    'Limitações físicas',
    'Compreensão de seus objetivos',
  ]

  console.log('data', data)
  return (
    <ContentScroll>
      <View className="gap-10">
        <View className="items-center gap-2 py-16">
          <Text className="text-foreground primary_regular text-[16px]">
            Plano Básico
          </Text>
          <View className="flex-row items-baseline">
            <Text className="text-sm text-primary">R$</Text>
            <Text className="text-foreground font-primary_bold text-[60px]">
              70.99
            </Text>
            <Text className="text-sm text-primary ml-1">/mes</Text>
          </View>
        </View>

        <View className="gap-4">
          <Heading title="Recursos Básicos" />
          {planBenefits.map((b, index) => (
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

        <Button label="Contratar" />
      </View>
    </ContentScroll>
  )
}
