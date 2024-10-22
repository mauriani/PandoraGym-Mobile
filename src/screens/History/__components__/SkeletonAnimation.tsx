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
      <Skeleton width={'100%'} height={320} />

      <View className="flex-row items-center justify-between mt-8 mb-1 mr-2">
        <Skeleton width={'60%'} height={20} />
        <Skeleton width={'70%'} height={16} />
      </View>

      <Spacer height={8} />

      <View className="min-h-32 flex-row gap-4">
        <Skeleton width={120} height={100} />

        <View>
          <Skeleton width={'50%'} height={20} />
          <Spacer height={8} />

          <Skeleton width={'100%'} height={20} />
          <Spacer height={8} />

          <View className="flex-row">
            <Skeleton width={'70%'} height={40} />
            <Skeleton width={'50%'} height={40} />
          </View>
        </View>
      </View>

      <View className="min-h-32 flex-row gap-4">
        <Skeleton width={120} height={100} />

        <View>
          <Skeleton width={'50%'} height={20} />
          <Spacer height={8} />

          <Skeleton width={'100%'} height={20} />
          <Spacer height={8} />

          <View className="flex-row">
            <Skeleton width={'70%'} height={40} />
            <Skeleton width={'50%'} height={40} />
          </View>
        </View>
      </View>

      <View className="min-h-32 flex-row gap-4">
        <Skeleton width={120} height={100} />

        <View>
          <Skeleton width={'50%'} height={20} />
          <Spacer height={8} />

          <Skeleton width={'100%'} height={20} />
          <Spacer height={8} />

          <View className="flex-row">
            <Skeleton width={'70%'} height={40} />
            <Skeleton width={'50%'} height={40} />
          </View>
        </View>
      </View>
    </MotiView>
  )
}
