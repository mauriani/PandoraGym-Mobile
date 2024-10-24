import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

const Spacer = ({ height = 8 }) => <View style={{ height }} />

const AnimatedSkeleton = ({ width, height }) => {
  const { colorScheme } = useContext(ThemeContext)
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: themes[colorScheme].mutedForeground,
          borderRadius: 4,
        },
        animatedStyle,
      ]}
    />
  )
}

export function SkeletonAnimation() {
  const { colorScheme } = useContext(ThemeContext)

  const backgroundColor = colorScheme ? '#000000' : '#ffffff'

  return (
    <View className="flex-1 gap-3" style={{ backgroundColor }}>
      <AnimatedSkeleton width={'50%'} height={20} />

      <AnimatedSkeleton width={'100%'} height={56} />

      <AnimatedSkeleton width={'50%'} height={20} />

      <View style={{ gap: 10 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} className="flex-row gap-4 items-center">
            <View className="h-28">
              <AnimatedSkeleton width={128} height={80} />
            </View>

            <View className="flex-1 justify-center">
              <AnimatedSkeleton width={'50%'} height={20} />
              <Spacer height={8} />
              <AnimatedSkeleton width={'45%'} height={16} />
              <Spacer height={8} />
              <AnimatedSkeleton width={'100%'} height={16} />
              <Spacer height={8} />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
