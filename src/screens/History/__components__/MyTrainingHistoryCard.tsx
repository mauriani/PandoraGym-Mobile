import { Image, Text, View } from 'react-native'
import { ITrainingHistory } from '@_dtos_/trainingHistoryDTO'
import { formatTime } from '@utils/formatTime'

import { ContentDetails } from './ContentDetails'

type IProps = {
  item: ITrainingHistory
}

export function MyTrainingHistoryCard({ item }: IProps) {
  return (
    <View className="h-28 flex-row gap-4 bg-secondary rounded-[8px] items-center p-2 relative">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.thumbnail,
        }}
        alt=""
      />

      <View className="flex-col justify-center gap-[2] ml-3 max-w-40">
        <Text
          className="text-white font-primary_bold text-base"
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.exerciseTitle}
        </Text>
        <Text className="text-muted-foreground text-sm">
          {item.sets} séries x {item.reps} repetições
        </Text>

        <View className="flex-row gap-2">
          <ContentDetails
            value={`${formatTime(item.restTime)}min`}
            label={'Tempo de Descanço'}
          />
          <ContentDetails
            value={`${item.weight} kg`}
            label={'Carga Utilizada'}
          />

          {/* <TouchableOpacity className="flex-row justify-center items-center gap-1 min-h-8 px-2 py-2 rounded-sm bg-primary-foreground">
            <IconComponent iconName="Dumbbell" size={20} />
            <View className="flex-col ">
              <Text className="text-foreground font-bold text-[10px]">
                Carga
              </Text>
              <Text className="text-sm text-foreground font-primary_bold">
                {item.weight} kg
              </Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity className="h-8 bg-zinc-500 px-1 py-1 rounded-sm">
            <Text className="text-primary text-base font-primary_bold">
              {item.weight} kg
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}
