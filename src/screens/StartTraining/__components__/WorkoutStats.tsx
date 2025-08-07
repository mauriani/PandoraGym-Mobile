import React from 'react'
import { Text, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'

interface StatItemProps {
  icon: string
  iconColor: string
  backgroundColor: string
  value: string | number
  label: string
}

interface WorkoutStatsProps {
  calories: number
  exercises: number
  duration: number
}

function StatItem({ icon, iconColor, backgroundColor, value, label }: StatItemProps) {
  return (
    <View className="items-center flex-1">
      <View 
        className="w-10 h-10 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor }}
      >
        <IconComponent iconName={icon} size={20} color={iconColor} />
      </View>
      <Text className="text-foreground font-semibold text-lg">
        {value}
      </Text>
      <Text className="text-muted-foreground text-xs">
        {label}
      </Text>
    </View>
  )
}

export function WorkoutStats({ calories, exercises, duration }: WorkoutStatsProps) {
  return (
    <View className="flex-row justify-between bg-card rounded-xl p-4">
      <StatItem
        icon="Flame"
        iconColor="#ef4444"
        backgroundColor="rgba(239, 68, 68, 0.2)"
        value={calories}
        label="Kcal"
      />
      
      <StatItem
        icon="Dumbbell"
        iconColor="#3b82f6"
        backgroundColor="rgba(59, 130, 246, 0.2)"
        value={exercises}
        label="Exercícios"
      />
      
      <StatItem
        icon="Clock"
        iconColor="#22c55e"
        backgroundColor="rgba(34, 197, 94, 0.2)"
        value={duration}
        label="Min"
      />
    </View>
  )
}
