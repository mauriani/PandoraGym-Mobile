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
    <View className="flex-1 items-center">
      <Icon height={180} width={180} color={themes[colorScheme].foreground} />

      <Text
        numberOfLines={2}
        className="text-center font-primary_bold text-lg text-foreground">
        {message}
      </Text>
    </View>
  )
}
