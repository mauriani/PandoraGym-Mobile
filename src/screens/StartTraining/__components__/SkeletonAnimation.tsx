import { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/build/skeleton/native'

export function SkeletonAnimation() {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <MotiView
      style={{ flex: 1, gap: 12 }}
      animate={{
        backgroundColor: colorScheme ? '#000000' : '#ffffff',
      }}>
      <Skeleton width={'100%'} height={200} radius={6} />
      <Skeleton width={'100%'} height={50} radius={6} />

      <View className="flex-row items-center justify-between gap-4 py-2">
        <Skeleton width={'60%'} height={40} radius={6} />
        <Skeleton width={'60%'} height={40} radius={6} />
      </View>

      <View className="flex-row justify-between pb-2">
        <Skeleton width={'60%'} height={16} radius={6} />
        <Skeleton width={'60%'} height={16} radius={6} />
      </View>

      {Array.from({ length: 2 }).map((_, index) => (
        <View key={index}>
          <Skeleton width={'100%'} height={112} radius={6} />
        </View>
      ))}
    </MotiView>
  )
}
