import { useContext } from 'react'
import { Text, View } from 'react-native'
import Icon from '@assets/svg/gym-fitness.svg'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

type IProps = {
  message: string
}

export function NoContent({ message }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <View className="flex-1 items-center justify-center">
      <Icon height={200} width={200} color={themes[colorScheme].foreground} />

      <Text
        numberOfLines={2}
        className="text-foreground font-primary_bold text-lg text-center">
        {message}
      </Text>
    </View>
  )
}
