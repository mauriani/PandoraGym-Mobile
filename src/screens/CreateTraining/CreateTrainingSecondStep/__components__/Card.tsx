import { Image, Text, TouchableOpacity, View } from 'react-native'
import { IExercise } from '@_dtos_/SelectExerciseDTO'

type IProps = {
  item: IExercise
  openModal: () => void
}

export function Card({ item, openModal }: IProps) {
  return (
    <TouchableOpacity
      className="h-28 flex-row bg-secondary rounded-[8px] items-center p-2 relative"
      onPress={openModal}>
      <>
        <Image
          className="h-full w-20 rounded-[6px]"
          source={{
            uri: item.exerciseThumb,
          }}
          alt=""
        />

        <View className="flex-col justify-center gap-2 ml-3">
          <Text className="text-white font-bold text-base">
            {item.exerciseTitle}
          </Text>
          <Text className="text-muted-foreground text-[14px]">
            {item.sets} séries x {item.reps} repetições
          </Text>
        </View>
      </>
    </TouchableOpacity>
  )
}
