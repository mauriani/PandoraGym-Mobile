import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Workout } from '@_dtos_/templateDTO'

type IProps = {
  training: Workout
  isFullWidth?: boolean
  onNavigate?: (title: string, id: string, thumbnail: string) => void
}

export function CardWorkouts({ training, onNavigate, isFullWidth }: IProps) {
  return (
    <TouchableOpacity
      className={`rounded-[8px] ${isFullWidth ? 'w-full' : 'w-72'} ${isFullWidth ? 'h-60' : 'h-44'}`}
      onPress={() =>
        onNavigate(training.name, training.id, training.thumbnail)
      }>
      <ImageBackground
        width={288}
        borderRadius={8}
        resizeMode="cover"
        source={{
          uri: training.thumbnail,
        }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <View
          className={`${isFullWidth ? 'h-60' : 'h-44'} justify-between p-4`}>
          <View className="bg-black rounded-[6px] py-2 px-2 self-start">
            <Text className="text-foreground font-primary_bold text-sm">
              {training.level}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            className="text-foreground font-primary_bold text-sm">
            {training.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}
