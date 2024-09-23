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

export function CardExercise({
  item,
  onSectedVideo,
  index,
  toggleSelectItem,
  isSelected,
}: IProps) {
  return (
    <TouchableOpacity
      className="h-28 gap-4 bg-secondary flex-row rounded-[8px] p-2 items-center"
      onPress={() => onSectedVideo(item, index)}>
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.exerciseThumb,
        }}
        alt=""
      />

      <View className="flex-col justify-center gap-[4px] ml-3">
        <Text className="text-white font-bold tex-[18]">
          {item.exerciseTitle}
        </Text>
        <Text className="text-muted-foreground tex-[14]">
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
