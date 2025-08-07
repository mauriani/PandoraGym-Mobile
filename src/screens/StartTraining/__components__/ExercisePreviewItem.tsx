import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { IconComponent } from '@components/IconComponent'

interface ExercisePreviewItemProps {
  item: StartExerciseDTO
  index: number
  onPress?: () => void
}

export function ExercisePreviewItem({ item, index, onPress }: ExercisePreviewItemProps) {
  const estimatedDuration = Math.round((item.sets * item.restTimeBetweenSets + 60) / 60) // em minutos

  return (
    <TouchableOpacity 
      className="flex-row items-center justify-between bg-card rounded-lg p-4 mb-3"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 bg-accent rounded-lg items-center justify-center mr-3 overflow-hidden">
          {item.thumbnail ? (
            <Image 
              source={{ uri: item.thumbnail }} 
              className="w-full h-full rounded-md"
              resizeMode="cover"
            />
          ) : (
            <IconComponent iconName="Dumbbell" size={20} />
          )}
        </View>
        
        <View className="flex-1">
          <Text className="text-foreground font-medium text-base" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {item.sets} séries • {item.reps} reps • {item.load}kg
          </Text>
        </View>
      </View>
      
      <View className="items-end">
        <Text className="text-muted-foreground text-xs">
          ~{estimatedDuration} min
        </Text>
        <IconComponent iconName="ChevronRight" size={16} />
      </View>
    </TouchableOpacity>
  )
}
