import { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/build/skeleton/native'

export function SkeletonAnimation() {
  const { colorScheme } = useContext(ThemeContext)

  const modeColor = colorScheme == 'light' ? 'light' : 'dark'

  const backgroundColor = colorScheme && themes[colorScheme].background
  return (
    <MotiView
      style={{ flex: 1, gap: 10 }}
      animate={{
        backgroundColor,
      }}>
      <View className="flex-1 gap-2 px-4 pt-4">
        <Skeleton colorMode={modeColor} width={'100%'} height={58} />

        <Skeleton height={240}>
          <Skeleton width={'100%'} height={240}></Skeleton>
        </Skeleton>

        <Skeleton height={240}>
          <Skeleton width={'100%'} height={240}></Skeleton>
        </Skeleton>

        <Skeleton height={240}>
          <Skeleton width={'100%'} height={240}></Skeleton>
        </Skeleton>
      </View>
    </MotiView>
  )
}
