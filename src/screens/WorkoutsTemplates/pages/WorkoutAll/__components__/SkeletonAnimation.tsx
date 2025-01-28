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
      style={{ flex: 1, gap: 12 }}
      animate={{
        backgroundColor,
      }}>
      {/* video */}
      <Skeleton width={'100%'} height={50} />

      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index}>
          <Skeleton width={'100%'} height={240} radius={8} />
        </View>
      ))}
    </MotiView>
  )
}
