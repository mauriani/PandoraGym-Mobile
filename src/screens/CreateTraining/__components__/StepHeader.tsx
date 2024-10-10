import { Text, View } from 'react-native'
import { Heading } from '@components/Heading'

type IProps = {
  title: string
  current: number | string
}

export function StepHeader({ title, current }: IProps) {
  return (
    <View className={'flex-row justify-between'}>
      <Heading title={title} />

      <Text className="text-foreground font-primary_bold text-base">
        Etapa {current} de 3
      </Text>
    </View>
  )
}
