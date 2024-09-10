import { Text, TouchableOpacity } from 'react-native'
import { IconComponent, IconNames } from '@components/IconComponent'

type IProps = {
  title: string
  iconName: IconNames
  color?: string
}

export function ButtonWithIcon({ title, iconName, color }: IProps) {
  return (
    <TouchableOpacity className="flex-row items-center justify-center bg-neutral-700 rounded-[6px] px-5 py-2">
      <IconComponent
        iconName={iconName}
        style={{ position: 'absolute', left: 5 }}
        color={color}
      />
      <Text className="text-white text-lg font-bold ml-4">{title}</Text>
    </TouchableOpacity>
  )
}
