import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useWorkout } from '@context/WorkoutContext'
import { useNavigation } from '@react-navigation/native'
import { getBottomBarStorage, getCurrentWorkoutStorage } from '@storage/index'
import { secondsToHourMinute } from '@utils/formatTime'

const WorkoutBar = () => {
  const navigation = useNavigation()
  const { navigate } = useNavigation()
  const { elapsedTime } = useWorkout()

  const bottom = getBottomBarStorage()
  const currentWorkout = getCurrentWorkoutStorage()

  const currentRouteWorkoutId =
    navigation.getState()?.routes[navigation.getState().index].params?.id

  const currentRouteWorkoutIdStart =
    navigation.getState()?.routes[navigation.getState().index].name

  const some = currentRouteWorkoutIdStart === 'startTraining' ? 38 : 3

  if (!currentWorkout || currentRouteWorkoutId === currentWorkout.id)
    return null

  return (
    <View
      style={{
        bottom: bottom + some,
      }}
      className={'absolute left-0 right-0 bg-gray-900 p-4'}>
      <TouchableOpacity
        className={'flex-row justify-between items-center'}
        onPress={() =>
          navigate('startTraining', {
            id: currentWorkout.id,
            name: currentWorkout.name,
          })
        }>
        <Image
          className="h-full w-20 rounded-[6px]"
          source={{
            uri: currentWorkout.exercise.exerciseThumb,
          }}
          alt=""
        />

        <View className="flex-col items-center">
          <Text className={'text-white text-base'}>{currentWorkout.name}</Text>
          <Text className={'text-white text-sm'}>
            {currentWorkout.exercise.exerciseTitle}
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
