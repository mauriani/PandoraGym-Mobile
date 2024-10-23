import { Fragment, useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/build/skeleton/native'

// const Spacer = ({ height = 8 }) => <MotiView style={{ height }} />

export function SkeletonAnimation() {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <MotiView
      style={{ gap: 8, padding: 16 }}
      animate={{
        backgroundColor: colorScheme ? '#000000' : '#ffffff',
      }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Fragment key={index}>
          <View className="flex-row gap-3 items-center justify-between mb-4">
            <View className="flex-row gap-3 items-center">
              <Skeleton width={40} height={40} radius="round" />
              <Skeleton width={100} height={20} />
            </View>
            <Skeleton width={80} height={20} />
          </View>

          <View className="flex-row">
            <Skeleton width={'90%'} height={240} />
            <Skeleton width={'80%'} height={240} />
          </View>
        </Fragment>
      ))}
    </MotiView>
  )
}
