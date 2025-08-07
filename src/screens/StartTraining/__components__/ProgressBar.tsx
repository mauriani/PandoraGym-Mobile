import React from 'react'
import { Text, View } from 'react-native'

interface ProgressBarProps {
  current: number
  total: number
  label?: string
}

export function ProgressBar({ current, total, label = "Progresso do Treino" }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-muted-foreground text-sm">
          {label}
        </Text>
        <Text className="text-muted-foreground text-sm">
          {current}/{total}
        </Text>
      </View>
      <View className="w-full h-2 bg-muted rounded-full">
        <View 
          className="h-2 bg-primary rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  )
}
