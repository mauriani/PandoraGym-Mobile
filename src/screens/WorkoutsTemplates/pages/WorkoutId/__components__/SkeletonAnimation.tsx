import { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/build/skeleton/native'

// const Spacer = ({ height = 8 }) => <MotiView style={{ height }} />

export function SkeletonAnimation() {
  const { colorScheme } = useContext(ThemeContext)

  const backgroundColor = colorScheme && themes[colorScheme].background

  return (
    <MotiView
      style={{ gap: 8, padding: 16 }}
      animate={{
        backgroundColor,
      }}>
      {/* video */}
      <Skeleton width={'100%'} height={300} radius={6} />

      <View className="mb-4 flex-row gap-3">
        <Skeleton width={100} height={30} radius={6} />
        <Skeleton width={100} height={30} radius={6} />
        <Skeleton width={100} height={30} radius={6} />
      </View>

      <View>
        <Skeleton width={'100%'} height={80} radius={6} />
      </View>

      {Array.from({ length: 2 }).map((_, index) => (
        <View key={index}>
          <Skeleton width={'100%'} height={128} radius={8} />
        </View>
      ))}
    </MotiView>
  )
}
