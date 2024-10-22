import { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/build/skeleton/native'

const Spacer = ({ height = 8 }) => <MotiView style={{ height }} />

export function SkeletonAnimation() {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <MotiView
      style={{ gap: 16 }}
      animate={{
        backgroundColor: colorScheme ? '#000000' : '#ffffff',
      }}>
      <View className="flex-row gap-4 items-center">
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
