import { Text, TouchableOpacity, View } from 'react-native'
import { IconComponent, IconNames } from '@components/IconComponent'

type IProps = {
  title: string
  iconName: IconNames
  color?: string
  size?: number
}

export function ButtonWithIcon({ title, iconName, color, size }: IProps) {
  return (
    <View className="flex items-center justify-center mt-3 mb-3 relative">
      <TouchableOpacity className="flex-row items-center justify-center bg-neutral-700 rounded-[6px] px-5 py-2">
        <IconComponent
          iconName={iconName}
          style={{ position: 'absolute', left: 5 }}
          color={color}
          size={size}
        />
        <Text className="text-white font-primary_bold text-lg ml-4">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
