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
          <View className="self-start rounded-[6px] bg-black px-2 py-2">
            <Text className="font-primary_bold text-sm text-foreground">
              {training.level}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            className="font-primary_bold text-sm text-foreground">
            {training.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}
