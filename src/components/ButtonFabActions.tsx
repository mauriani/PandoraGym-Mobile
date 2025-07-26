import React, { useState } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import { IconComponent, IconNames } from '@components/IconComponent'

type FabAction = {
  iconName: IconNames
  onPress: () => void
}

type Props = {
  actions: FabAction[]
}

export function ButtonFabActions({ actions }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [animation] = useState(new Animated.Value(0))

  const toggleActions = () => {
    const toValue = isOpen ? 0 : 1
    setIsOpen(!isOpen)

    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start()
  }

  return (
    <View className="absolute bottom-9 right-5">
      {isOpen &&
        actions.map((action, index) => {
          const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(70 * (index + 1))],
          })

          return (
            <Animated.View
              key={index}
              style={{
                transform: [{ translateY }],
                position: 'absolute',
                bottom: 0,
              }}>
              <TouchableOpacity
                className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-800 shadow-md"
                style={{
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                }}
                onPress={() => {
                  action.onPress()
                  toggleActions()
                }}>
                <IconComponent iconName={action.iconName} size={25} />
              </TouchableOpacity>
            </Animated.View>
          )
        })}

      <TouchableOpacity
        className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-800 shadow-md"
        style={{
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
        }}
        onPress={toggleActions}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '45deg'],
                }),
              },
            ],
          }}>
          <IconComponent iconName="Plus" size={25} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}
