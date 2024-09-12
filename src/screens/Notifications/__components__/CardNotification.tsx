import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { Star } from 'lucide-react-native'

type INotifications = {
  id: string
  title: string
  message: string
}

type IProps = {
  item: INotifications
}

export function CardNotification({ item }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <TouchableOpacity className="max-h-32 flex-row bg-secondary rounded-[8px] items-center px-3 py-4 relative">
      <View className="flex-row gap-3 items-center">
        <View className="h-16 w-16 bg-purple-800 rounded-full items-center justify-center">
          <Star size={28} color={themes[colorScheme].foreground} />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-foreground font-primary_bold text-xl">
            {item.title}
          </Text>
          <Text
            className="text-muted-foreground font-primary_regular text-base"
            numberOfLines={3}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
