import { Image, Text, View } from 'react-native'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { Checkbox } from '@components/ui/Checkbox'

type IProps = {
  item: IExercise
  isSelected: boolean
  toggleSelectItem: (id: string) => void
}

export function CardExercisesSelect({
  item,
  isSelected,
  toggleSelectItem,
}: IProps) {
  return (
    <View className="relative h-20 flex-row items-center rounded-[8px] bg-secondary p-2">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.exerciseThumb,
        }}
        alt=""
      />

      <View className="ml-3 flex-1 flex-col justify-center">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="flex-wrap font-primary_bold text-sm text-white">
          {item.exerciseTitle}
        </Text>
      </View>

      <Checkbox
        style={{ marginLeft: 10 }}
        isChecked={isSelected}
        onPress={() => toggleSelectItem(item.id)}
      />
    </View>
  )
}
