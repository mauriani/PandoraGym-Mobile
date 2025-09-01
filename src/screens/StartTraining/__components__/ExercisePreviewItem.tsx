import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { IconComponent } from '@components/IconComponent'

interface ExercisePreviewItemProps {
  item: StartExerciseDTO
  index: number
  onPress?: () => void
}

export function ExercisePreviewItem({
  item,
  index,
  onPress,
}: ExercisePreviewItemProps) {
  const estimatedDuration = Math.round(
    (item.sets * item.restTimeBetweenSets + 60) / 60,
  ) // em minutos

  return (
    <TouchableOpacity
      className="mb-3 flex-row items-center justify-between rounded-lg bg-card p-4"
      activeOpacity={0.7}
      onPress={onPress}>
      <View className="flex-1 flex-row items-center">
        <View className="mr-3 h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-accent">
          {item.thumbnail ? (
            <Image
              source={{ uri: item.thumbnail }}
              className="h-full w-full rounded-md"
              resizeMode="cover"
            />
          ) : (
            <IconComponent iconName="Dumbbell" size={20} />
          )}
        </View>

        <View className="flex-1">
          <Text
            className="text-base font-medium text-foreground"
            numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {item.sets} séries • {item.reps} reps • {item.load}kg
          </Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-xs text-muted-foreground">
          Duração•{estimatedDuration} min
        </Text>
      </View>
    </TouchableOpacity>
  )
}
