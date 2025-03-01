import { Image, Text, View } from 'react-native'
import { IExercise } from '@_dtos_/SelectExerciseDTO'

import { Checkbox } from './ui/Checkbox'

type IProps = {
  item: IExercise
  isSelected: boolean
  toggleSelectItem: (id: string) => void
}

export function SelectExerciseCard({
  item,
  isSelected,
  toggleSelectItem,
}: IProps) {
  return (
    <View className="relative h-28 flex-row items-center rounded-[8px] bg-secondary p-2">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.exerciseThumb,
        }}
        alt=""
      />

      <View className="ml-3 flex-col justify-center gap-[2]">
        <Text className="font-primary_bold text-base text-white">
          {item.exerciseTitle}
        </Text>
      </View>

      <Checkbox
        style={{ position: 'absolute', right: 16 }}
        isChecked={isSelected}
        onPress={() => toggleSelectItem(item.id)}
      />
    </View>
  )
}
