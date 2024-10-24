import { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/build/skeleton/native'

// const Spacer = ({ height = 8 }) => <MotiView style={{ height }} />

export function SkeletonAnimation() {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <MotiView
      style={{ flex: 1, gap: 8, padding: 16 }}
      animate={{
        backgroundColor: colorScheme ? '#000000' : '#ffffff',
      }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index} className="gap-3">
          {/* CardTop */}
          <View className="flex-row gap-3 items-center justify-between">
            <View className="flex-row gap-3 items-center">
              <Skeleton width={40} height={40} radius="round" />
              <Skeleton width={100} height={16} />
            </View>
            <Skeleton width={80} height={20} />
          </View>

          <View className="flex-row gap-3">
            <Skeleton width={288} height={160} />
            <Skeleton width={288} height={160} />
          </View>
        </View>
      ))}
    </MotiView>
  )
}
