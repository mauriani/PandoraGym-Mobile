import { Image, Text, View } from 'react-native'
import { ExerciseConfig } from '@_dtos_/detailsTemplateDTO'
import { IconComponent } from '@components/IconComponent'
import { SubTitle } from '@components/SubTitle'
import { convertSecondsToMinutes } from '@utils/formatTime'

type IProps = {
  item: ExerciseConfig
}

export function CardDetails({ item }: IProps) {
  return (
    <View className="h-32 flex-row gap-4 bg-secondary rounded-[8px] items-center p-2 relative">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.exerciseThumb,
        }}
        alt=""
      />

      <View className="flex-col justify-center gap-1 ml-3">
        <Text className="text-white font-bold text-base">
          {item.exerciseTitle}
        </Text>
        <Text className="text-muted-foreground text-sm">
          {item.sets} séries x {item.reps} repetições
        </Text>

        <View className="flex-row justify-between items-center gap-2">
          <View className="flex-row items-center gap-2 bg-accent px-2 py-2 rounded-[6px]">
            <IconComponent iconName="Timer" size={20} />
            <SubTitle
              title={`${convertSecondsToMinutes(item.restTimeBetweenSets)}`}
            />
          </View>

          <View className="flex-row items-center gap-2 bg-accent px-2 py-2 rounded-[6px]">
            <IconComponent iconName="Weight" size={20} />
            <SubTitle title={`${item?.load} kg`} />
          </View>
        </View>
      </View>
    </View>
  )
}
