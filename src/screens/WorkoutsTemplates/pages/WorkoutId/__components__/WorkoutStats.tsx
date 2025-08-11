import { Text, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'
import { useContext } from 'react'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

interface WorkoutStatsProps {
  duration: string
  calories: string
  exercises: number
  level?: 'INICIANTE' | 'INTERMEDIARIO' | 'AVANCADO'
  isPremium?: boolean
}

export function WorkoutStats({
  duration,
  calories,
  exercises,
  level,
  isPremium = false,
}: WorkoutStatsProps) {
  const { colorScheme } = useContext(ThemeContext)
  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'INICIANTE':
        return '#10B981' // green
      case 'INTERMEDIARIO':
        return '#F59E0B' // yellow
      case 'AVANCADO':
        return '#EF4444' // red
      default:
        return '#6B7280' // gray
    }
  }

  const getLevelText = (level?: string) => {
    switch (level) {
      case 'INICIANTE':
        return 'Iniciante'
      case 'INTERMEDIARIO':
        return 'Intermediário'
      case 'AVANCADO':
        return 'Avançado'
      default:
        return 'Todos os níveis'
    }
  }

  return (
    <View className="mb-4 rounded-xl bg-secondary/30 p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-semibold text-muted">
          Informações do Treino
        </Text>
        {isPremium && (
          <View className="flex-row items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-1">
            <IconComponent
              iconName="Crown"
              size={12}
              color={themes[colorScheme].primary}
            />
            <Text className="text-xs font-medium text-yellow-500">Premium</Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-between">
        {/* Duration */}
        <View className="flex-1 items-center">
          <View className="mb-2 rounded-full bg-blue-500/20 p-3">
            <IconComponent
              iconName="Clock1"
              size={20}
              color={themes[colorScheme].info}
            />
          </View>
          <Text className="text-sm font-medium text-muted">{duration}</Text>
          <Text className="text-xs text-muted-foreground">Duração</Text>
        </View>

        {/* Calories */}
        <View className="flex-1 items-center">
          <View className="mb-2 rounded-full bg-orange-500/20 p-3">
            <IconComponent iconName="Flame" size={20} color="#F97316" />
          </View>
          <Text className="text-sm font-medium text-muted">{calories}Cal</Text>
          <Text className="text-xs text-muted-foreground">Calorias</Text>
        </View>

        {/* Exercises */}
        <View className="flex-1 items-center">
          <View className="mb-2 rounded-full bg-green-500/20 p-3">
            <IconComponent
              iconName="Activity"
              size={20}
              color={themes[colorScheme].success}
            />
          </View>
          <Text className="text-sm font-medium text-muted">{exercises}</Text>
          <Text className="text-xs text-muted-foreground">Exercícios</Text>
        </View>

        {/* Level */}
        {level && (
          <View className="flex-1 items-center">
            <View
              className="mb-2 rounded-full p-3"
              style={{ backgroundColor: `${getLevelColor(level)}20` }}>
              <IconComponent
                iconName="Target"
                size={20}
                color={getLevelColor(level)}
              />
            </View>
            <Text className="text-center text-sm font-medium text-muted">
              {getLevelText(level)}
            </Text>
            <Text className="text-xs text-muted-foreground">Nível</Text>
          </View>
        )}
      </View>
    </View>
  )
}
