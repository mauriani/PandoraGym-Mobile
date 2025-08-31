import React from 'react'
import { Text, View } from 'react-native'
import { IconComponent, IconNames } from '@components/IconComponent'

interface StatItemProps {
  icon: IconNames
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

function StatItem({
  icon,
  iconColor,
  backgroundColor,
  value,
  label,
}: StatItemProps) {
  return (
    <View className="flex-1 flex-row items-center gap-2">
      <View
        className="mb-2 h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor }}>
        <IconComponent iconName={icon} size={20} color={iconColor} />
      </View>
      <Text className="text-lg font-semibold text-foreground">{value}</Text>
      <Text className="text-xs text-muted-foreground">{label}</Text>
    </View>
  )
}

export function WorkoutStats({
  calories,
  exercises,
  duration,
}: WorkoutStatsProps) {
  return (
    <View className="flex-row justify-between gap-2 rounded-xl bg-card">
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
