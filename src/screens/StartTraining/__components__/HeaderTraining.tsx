import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { IconComponent } from '@components/IconComponent'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@routes/stack.routes'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { useContext } from 'react'
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'

type IProps = {
  totalExercises: number
  durationInMinutes: number
  estimatedCalories: number
  exclusive: boolean
  image: string
  name: string
  handleDeleteWorkout: () => void
  handleEditWorkout: () => void
}

export function HeaderTraining({
  totalExercises,
  durationInMinutes,
  estimatedCalories,
  exclusive,
  image,
  handleDeleteWorkout,
  handleEditWorkout,
  name,
}: IProps) {
  const { goBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { colorScheme } = useContext(ThemeContext)
  const { height } = useWindowDimensions()
  const headerHeight = height * 0.4
  return (
    <ImageBackground
      source={{ uri: image }}
      resizeMode="cover"
      style={{ height: headerHeight }}>
      {/* Overlay escuro */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      <View className="absolute left-0 right-0 top-12 z-10 flex-row items-center justify-between px-4">
        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full bg-black/30"
          onPress={goBack}>
          <IconComponent
            iconName="ArrowLeft"
            size={20}
            color={themes[colorScheme].foreground}
          />
        </TouchableOpacity>

        <View className="flex-row gap-2">
          {!exclusive && (
            <>
              <TouchableOpacity
                className="h-10 w-10 items-center justify-center rounded-full bg-black/30"
                onPress={handleEditWorkout}>
                <IconComponent
                  iconName="Edit"
                  size={18}
                  color={themes[colorScheme].foreground}
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="h-10 w-10 items-center justify-center rounded-full bg-black/30"
                onPress={handleDeleteWorkout}>
                <IconComponent
                  iconName="Trash2"
                  size={18}
                  color={themes[colorScheme].foreground}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 p-6">
        <View className="mb-2 flex-row items-center">
          {exclusive && (
            <View className="mr-2 rounded-full bg-primary/20 px-2 py-1">
              <Text className="text-xs font-medium text-primary">Personal</Text>
            </View>
          )}
          <View className="rounded-full bg-black/30 px-2 py-1">
            <Text className="text-xs text-foreground">
              {totalExercises} exercícios
            </Text>
          </View>
        </View>
        <Text className="mb-1 text-3xl font-bold text-foreground">{name}</Text>
        <Text className="text-lg text-white/80">
          {durationInMinutes} min • ~{estimatedCalories} kcal
        </Text>
      </View>
    </ImageBackground>
  )
}
