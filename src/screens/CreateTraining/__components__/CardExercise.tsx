import { Image, Text, View } from 'react-native'
import { IExercise } from '@_dtos_/SelectExerciseDTO'

type IProps = {
  item: IExercise
}

export function CardExercise({ item }: IProps) {
  return (
    <View className="h-20 flex-row gap-4 bg-secondary rounded-[8px] items-center p-2 relative">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.exerciseThumb,
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
      </View>

      <Text className="text-primary text-base font-primary_bold">
        {item.restTimeBetweenSets}
      </Text>

      <Text className="text-primary text-base font-primary_bold">
        {item.load} kg
      </Text>
    </View>
  )
}
