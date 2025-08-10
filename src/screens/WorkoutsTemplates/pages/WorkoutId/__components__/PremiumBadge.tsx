import { Text, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'

export function PremiumBadge() {
  return (
    <View className="flex-row items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-3 py-1.5 shadow-lg">
      <IconComponent iconName="Crown" size={14} color="#000" />
      <Text className="text-xs font-bold uppercase tracking-wide text-black">
        Premium
      </Text>
    </View>
  )
}
