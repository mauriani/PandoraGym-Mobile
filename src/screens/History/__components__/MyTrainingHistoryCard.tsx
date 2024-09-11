import { Image, Text, View } from 'react-native'
import { ITrainingHistory } from '@_dtos_/trainingHistoryDTO'

type IProps = {
  item: ITrainingHistory
}

export function MyTrainingHistoryCard({ item }: IProps) {
  return (
    <View className="h-20 flex-row gap-4 bg-secondary rounded-[8px] items-center p-2 relative">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.image,
        }}
        alt=""
      />

      <View className="flex-col justify-center gap-[2] ml-3">
        <Text className="text-white font-primary_bold tex-[18px]">
          {item.title}
        </Text>
        <Text className="text-muted-foreground tex-[14]">{item.volume}</Text>
      </View>

      <Text className="text-primary tex-[16px] font-primary_regular">
        {item.time}
      </Text>

      <Text className="text-primary tex-[16px] font-primary_regular">
        {item.load}
      </Text>
    </View>
  )
}
