import { Image, Text, View } from 'react-native'
import { ITrainingHistory } from '@_dtos_/trainingHistoryDTO'
import { formatTime } from '@utils/formatTime'

type IProps = {
  item: ITrainingHistory
}

export function MyTrainingHistoryCard({ item }: IProps) {
  return (
    <View className="h-20 flex-row gap-4 bg-secondary rounded-[8px] items-center p-2 relative">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.thumbnail,
        }}
        alt=""
      />

      <View className="flex-col justify-center gap-[2] ml-3">
        <Text className="text-white font-primary_bold text-base">
          {item.exerciseTitle}
        </Text>
        <Text className="text-muted-foreground text-sm">
          {item.sets} séries x {item.reps} repetições
        </Text>
      </View>

      <Text className="text-primary text-base font-primary_bold">
        {formatTime(item.restTime)}
      </Text>

      <Text className="text-primary text-base font-primary_bold">
        {item.weight} kg
      </Text>
    </View>
  )
}
