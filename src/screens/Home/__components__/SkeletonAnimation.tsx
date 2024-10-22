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
      style={{ gap: 8, padding: 16 }}
      animate={{
        backgroundColor: colorScheme ? '#000000' : '#ffffff',
      }}>
      <Skeleton width={'50%'} height={20} />
      <Skeleton width={'100%'} height={56} />

      <Skeleton width={'50%'} height={20} />

      <View className="flex-row gap-4 items-center">
        <View className="h-28">
          <Skeleton width={128} height={80} />
        </View>

        <View className="flex-1 justify-center">
          <Skeleton width={'50%'} height={20} />
          <Spacer height={8} />
          <Skeleton width={'45%'} height={16} />
          <Spacer height={8} />
          <Skeleton width={'100%'} height={16} />
          <Spacer height={8} />
        </View>
      </View>

      <View className="flex-row gap-4 items-center">
        <View className="h-28">
          <Skeleton width={128} height={80} />
        </View>

        <View className="flex-1 justify-center">
          <Skeleton width={'50%'} height={20} />
          <Spacer height={8} />
          <Skeleton width={'45%'} height={16} />
          <Spacer height={8} />
          <Skeleton width={'100%'} height={16} />
          <Spacer height={8} />
        </View>
      </View>

      <View className="flex-row gap-4 items-center">
        <View className="h-28">
          <Skeleton width={128} height={80} />
        </View>

        <View className="flex-1 justify-center">
          <Skeleton width={'50%'} height={20} />
          <Spacer height={8} />
          <Skeleton width={'45%'} height={16} />
          <Spacer height={8} />
          <Skeleton width={'100%'} height={16} />
          <Spacer height={8} />
        </View>
      </View>
    </MotiView>
  )
}
