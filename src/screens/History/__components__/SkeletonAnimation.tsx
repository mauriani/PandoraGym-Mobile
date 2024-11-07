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
      style={{ flex: 1, gap: 8 }}
      animate={{
        backgroundColor: colorScheme ? '#000000' : '#ffffff',
      }}>
      <View className="mb-1 mr-2 mt-8 flex-row items-center justify-between">
        <Skeleton width={'60%'} height={20} />
        <Skeleton width={'70%'} height={16} />
      </View>

      {Array.from({ length: 5 }).map((_, index) => (
        <View key={index} className="min-h-32 flex-row gap-4">
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
      ))}
    </MotiView>
  )
}
