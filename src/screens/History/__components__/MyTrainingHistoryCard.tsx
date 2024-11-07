import { Image, Text, View } from 'react-native'
import { ITrainingHistory } from '@_dtos_/trainingHistoryDTO'
import { formatTime } from '@utils/formatTime'

import { ContentDetails } from './ContentDetails'

type IProps = {
  item: ITrainingHistory
}

export function MyTrainingHistoryCard({ item }: IProps) {
  return (
    <View className="relative min-h-32 flex-row items-center gap-4 rounded-[8px] bg-secondary p-2">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.thumbnail,
        }}
        alt=""
      />

      <View className="ml-3 flex-col justify-center gap-1">
        <Text
          className="font-primary_bold text-base text-white"
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.exerciseTitle}
        </Text>
        <Text className="text-sm text-muted-foreground">
          {item.sets} séries x {item.reps} repetições
        </Text>

        <View className="mt-2 flex-row gap-2">
          <ContentDetails
            value={`${formatTime(item.restTime)}min`}
            label={'Tempo de Descanso'}
          />
          <ContentDetails
            value={`${item.weight} kg`}
            label={'Carga Utilizada'}
          />
        </View>
      </View>
    </View>
  )
}
