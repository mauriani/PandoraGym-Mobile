import { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/build/skeleton/native'

const Spacer = ({ height = 8 }) => <MotiView style={{ height }} />

export function SkeletonAnimation() {
  const { colorScheme } = useContext(ThemeContext)

  const backgroundColor = colorScheme && themes[colorScheme].background
  return (
    <MotiView
      style={{ flex: 1, gap: 8 }}
      animate={{
        backgroundColor,
      }}>
      <View className="flex-row items-center justify-between p-1">
        <Skeleton width={'70%'} height={20} />
        <Skeleton width={'53%'} height={16} />
      </View>

      {Array.from({ length: 5 }).map((_, index) => (
        <View key={index} className="min-h-32 flex-row items-center gap-4 p-1">
          <Skeleton width={120} height={100} />

          <View>
            <Skeleton width={'52%'} height={20} />
            <Spacer height={8} />

            <Skeleton width={'52%'} height={20} />
            <Spacer height={8} />

            <View className="flex-row">
              <Skeleton width={'72%'} height={40} />
              <Skeleton width={'50%'} height={40} />
            </View>
          </View>
        </View>
      ))}
    </MotiView>
  )
}
