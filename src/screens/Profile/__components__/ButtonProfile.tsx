import { useContext } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { IconComponent, IconNames } from '@components/IconComponent'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

type IProps = {
  title: string
  iconName: IconNames
  size?: number
  onPress?: () => void
}

export function ButtonProfile({ title, iconName, size, onPress }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <TouchableOpacity
      className="h-14 flex-row bg-secondary rounded-[8px] items-center p-2 relative"
      onPress={onPress}>
      <Text className="text-muted-foreground font-base">{title}</Text>

      <IconComponent
        iconName={iconName}
        size={size || 30}
        style={{ position: 'absolute', right: 16 }}
        color={themes[colorScheme].mutedForeground}
      />
    </TouchableOpacity>
  )
}
