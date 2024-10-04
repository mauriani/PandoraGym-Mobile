import { Image, Text, TouchableOpacity, View } from 'react-native'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { convertSecondsToMinutes } from '@utils/formatTime'

type IProps = {
  item: StartExerciseDTO
  openModal: () => void
}

export function CardEditWorkout({ item, openModal }: IProps) {
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

        <View className="flex-col justify-center gap-0 ml-3">
          <Text className="text-white font-bold text-lg">
            {item.exerciseTitle}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {item.sets} séries x {item.reps} repetições
          </Text>

          <Text className="text-muted-foreground text-sm">
            Carga • {item.load}
          </Text>

          <Text className="text-muted-foreground text-sm">
            Tempo de Descanço •{' '}
            {convertSecondsToMinutes(item.restTimeBetweenSets)}
          </Text>
        </View>
      </>
    </TouchableOpacity>
  )
}
