import { Text, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'

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
  isPremium = false 
}: WorkoutStatsProps) {
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
    <View className="bg-secondary/30 rounded-xl p-4 mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-white font-semibold text-base">
          Informações do Treino
        </Text>
        {isPremium && (
          <View className="bg-yellow-500/20 px-2 py-1 rounded-full flex-row items-center gap-1">
            <IconComponent iconName="Crown" size={12} color="#EAB308" />
            <Text className="text-yellow-500 text-xs font-medium">Premium</Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-between">
        {/* Duration */}
        <View className="flex-1 items-center">
          <View className="bg-blue-500/20 p-3 rounded-full mb-2">
            <IconComponent iconName="Clock1" size={20} color="#3B82F6" />
          </View>
          <Text className="text-white font-medium text-sm">{duration}</Text>
          <Text className="text-muted-foreground text-xs">Duração</Text>
        </View>

        {/* Calories */}
        <View className="flex-1 items-center">
          <View className="bg-orange-500/20 p-3 rounded-full mb-2">
            <IconComponent iconName="Flame" size={20} color="#F97316" />
          </View>
          <Text className="text-white font-medium text-sm">{calories}Cal</Text>
          <Text className="text-muted-foreground text-xs">Calorias</Text>
        </View>

        {/* Exercises */}
        <View className="flex-1 items-center">
          <View className="bg-green-500/20 p-3 rounded-full mb-2">
            <IconComponent iconName="Activity" size={20} color="#10B981" />
          </View>
          <Text className="text-white font-medium text-sm">{exercises}</Text>
          <Text className="text-muted-foreground text-xs">Exercícios</Text>
        </View>

        {/* Level */}
        {level && (
          <View className="flex-1 items-center">
            <View 
              className="p-3 rounded-full mb-2"
              style={{ backgroundColor: `${getLevelColor(level)}20` }}>
              <IconComponent iconName="Target" size={20} color={getLevelColor(level)} />
            </View>
            <Text className="text-white font-medium text-sm text-center">
              {getLevelText(level)}
            </Text>
            <Text className="text-muted-foreground text-xs">Nível</Text>
          </View>
        )}
      </View>
    </View>
  )
}
