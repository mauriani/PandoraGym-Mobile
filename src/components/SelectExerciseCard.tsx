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
    <View className="h-28  flex-row bg-secondary rounded-[8px] items-center p-2 relative">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.image,
        }}
        alt=""
      />

      <View className="flex-col justify-center gap-[2] ml-3">
        <Text className="text-white font-primary_bold tex-[18PX]">
          {item.title}
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
