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
      style={{ gap: 16 }}
      animate={{
        backgroundColor,
      }}>
      <View className="flex-row items-center gap-4">
        <View>
          <Skeleton radius="round" width={128} height={128} />
        </View>

        <View className="flex-1 justify-center">
          <Skeleton width={'80%'} height={20} />
          <Spacer height={8} />
          <Skeleton width={'100%'} height={16} />
          <Spacer height={8} />
          <Skeleton width={'100%'} height={16} />
          <Spacer height={8} />
          <Skeleton width={'100%'} height={16} />
        </View>
      </View>

      <Skeleton width={'80%'} height={20} />

      <Skeleton width={'100%'} height={100} />

      <Skeleton width={'80%'} height={20} />

      <Skeleton width={'100%'} height={60} />
      <Skeleton width={'100%'} height={60} />
      <Skeleton width={'100%'} height={60} />
      <Skeleton width={'100%'} height={60} />
    </MotiView>
  )
}
