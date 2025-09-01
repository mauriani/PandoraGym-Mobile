import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { IconComponent, IconNames } from '@components/IconComponent'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

interface StatItemProps {
  icon: IconNames
  bgColorClass: string
  value: string | number
  label: string
}

interface WorkoutStatsProps {
  calories: number
  exercises: number
  duration: number
}

function StatItem({ icon, bgColorClass, value, label }: StatItemProps) {
  return (
    <View className="items-center flex-1">
      <View className={`w-8 h-8 rounded-xl items-center justify-center mb-2 ${bgColorClass}`}>
        <IconComponent iconName={icon} size={16} />
      </View>
      <Text className="text-foreground font-bold text-base mb-1">
        {value}
      </Text>
      <Text className="text-muted-foreground text-xs">
        {label}
      </Text>
    </View>
  )
}

export function WorkoutStats({
  calories,
  exercises,
  duration,
}: WorkoutStatsProps) {
  return (
    <View className="flex-row justify-between bg-card rounded-xl p-4 border border-border/50">
      <StatItem
        icon="Flame"
        bgColorClass="bg-destructive/20"
        value={calories}
        label="Kcal"
      />
      
      <View className="w-px bg-border/30 mx-1" />
      
      <StatItem
        icon="Dumbbell"
        bgColorClass="bg-info/20"
        value={exercises}
        label="Exercícios"
      />
      
      <View className="w-px bg-border/30 mx-1" />
      
      <StatItem
        icon="Clock"
        bgColorClass="bg-success/20"
        value={`${duration}m`}
        label="Duração"
      />
    </View>
  )
}
