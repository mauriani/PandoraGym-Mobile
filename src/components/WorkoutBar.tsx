import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { getBottomBarStorage } from '@storage/index'
import { secondsToHourMinute } from '@utils/formatTime'

import { useWorkout } from '../context/WorkoutContext'

const WorkoutBar = () => {
  const { currentWorkout, elapsedTime } = useWorkout()
  const bottom = getBottomBarStorage()

  if (!currentWorkout) return null

  return (
    <View
      style={{
        bottom: bottom + 3,
      }}
      className={'absolute left-0 right-0 bg-gray-900 p-4'}>
      <TouchableOpacity className={'flex-row justify-between items-center'}>
        <Image
          className="h-full w-20 rounded-[6px]"
          source={{
            uri: currentWorkout.image,
          }}
          alt=""
        />

        <View className="flex-col">
          <Text className={'text-white text-lg'}>{currentWorkout.name}</Text>
          <Text className={'text-white text-sm'}>
            {currentWorkout.exerciseTitle}
          </Text>
        </View>

        <Text className={'text-green-500'}>
          {secondsToHourMinute(elapsedTime)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default WorkoutBar
