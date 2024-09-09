import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { ItrainingTemplate } from '@_dtos_/templateDTO'

type IProps = {
  training: ItrainingTemplate
  onNavigate: (title: string) => void
}

export function CardWorkouts({ training, onNavigate }: IProps) {
  return (
    <TouchableOpacity onPress={() => onNavigate(training.title)}>
      <ImageBackground
        className="h-44 w-72 rounded-[8px]"
        source={{
          uri: training.tumbnail,
        }}>
        <View className="h-44 justify-between p-4">
          <TouchableOpacity className="bg-black rounded-[6px] w-28 h-10 justify-center items-center">
            <Text className="text-foreground font-primary_bold text-[14px]">
              {training.level}
            </Text>
          </TouchableOpacity>
          <Text className="text-foreground font-primary_bold text-[16px]">
            {training.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}
