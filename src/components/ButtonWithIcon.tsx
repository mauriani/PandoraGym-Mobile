import { Text, TouchableOpacity, View } from 'react-native'
import { IconComponent, IconNames } from '@components/IconComponent'

type IProps = {
  title: string
  iconName: IconNames
  color?: string
  size?: number
  onPress?: () => void
}

export function ButtonWithIcon({
  title,
  iconName,
  color,
  size,
  onPress,
}: IProps) {
  return (
    <View className="relative mb-3 mt-3 flex items-center justify-center">
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-center rounded-[6px] bg-neutral-700 px-5 py-2">
        <IconComponent
          iconName={iconName}
          style={{ position: 'absolute', left: 5 }}
          color={color}
          size={size}
        />
        <Text className="ml-4 font-primary_bold text-lg text-white">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
