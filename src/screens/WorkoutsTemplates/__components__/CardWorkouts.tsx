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
  onNavigate: (title: string, id: string, thumbnail: string) => void
}

export function CardWorkouts({ training, onNavigate }: IProps) {
  return (
    <TouchableOpacity
      className="h-44 w-72 rounded-[8px]"
      onPress={() =>
        onNavigate(training.name, training.id, training.thumbnail)
      }>
      <ImageBackground
        width={288}
        borderRadius={8}
        source={{
          uri: training.thumbnail,
        }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <View className="h-44 justify-between p-4">
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
