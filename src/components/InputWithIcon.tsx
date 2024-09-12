import { TouchableOpacity, View } from 'react-native'

import { Input } from './ui/Input'
import { IconComponent, IconNames } from './IconComponent'

type IProps = {
  onChangeText?: (text: string) => void
  onNavigate?: () => void
  iconName: IconNames
  color?: string
  size?: number
  label: string
}

export function InputWithIcon({
  onChangeText,
  onNavigate,
  iconName,
  color,
  size,
  label,
}: IProps) {
  return (
    <View className="flex-row w-[100%] mb-5">
      <Input label={label} className="w-[85%]" onChangeText={onChangeText} />

      <TouchableOpacity
        className="rounded-[6px] bg-purple-800 w-16 h-15 justify-center items-center ml-2 z-10"
        onPress={onNavigate}>
        <IconComponent iconName={iconName} color={color} size={size} />
      </TouchableOpacity>
    </View>
  )
}
