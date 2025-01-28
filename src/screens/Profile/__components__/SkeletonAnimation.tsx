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
      style={{ gap: 8, padding: 16 }}
      animate={{
        backgroundColor,
      }}>
      <View>
        <View className="items-center justify-center gap-2">
          <Skeleton width={160} height={160} radius="round" />

          <Skeleton width={100} height={20} />
          <Skeleton width={140} height={20} />
          <Skeleton width={180} height={40} radius="round" />
        </View>

        <View>
          <Spacer height={10} />
          <Skeleton width={'100%'} height={40} />
          <Spacer height={10} />
          <Skeleton width={'100%'} height={40} />
          <Spacer height={10} />
          <Skeleton width={'100%'} height={40} />
        </View>
      </View>
    </MotiView>
  )
}
