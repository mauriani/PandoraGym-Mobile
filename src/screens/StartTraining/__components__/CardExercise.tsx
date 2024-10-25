import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { Checkbox } from '@components/ui/Checkbox'

type IProps = {
  item: StartExerciseDTO
  index: number
  onSectedVideo: (item: StartExerciseDTO, index: number) => void
  toggleSelectItem: (item: StartExerciseDTO) => void
  isSelected: boolean
}

function CardExercise({
  item,
  onSectedVideo,
  index,
  toggleSelectItem,
  isSelected,
}: IProps) {
  return (
    <TouchableOpacity
      className="h-28 flex-row items-center gap-4 rounded-[8px] bg-secondary p-2"
      onPress={() => onSectedVideo(item, index)}>
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.exerciseThumb,
        }}
        alt=""
      />

      <View className="ml-3 flex-col justify-center gap-[4px]">
        <Text className="text-[14px] font-bold text-white">
          {item.exerciseTitle}
        </Text>
        <Text className="text-[14px] text-muted-foreground">
          {item.sets} séries x {item.reps} repetições
        </Text>
      </View>

      <Checkbox
        style={{ position: 'absolute', right: 16 }}
        isChecked={isSelected}
        onPress={() => toggleSelectItem(item)}
      />
    </TouchableOpacity>
  )
}

export default React.memo(CardExercise)
