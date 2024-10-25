import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { convertSecondsToMinutes } from '@utils/formatTime'

type IProps = {
  item: StartExerciseDTO
  openModal: () => void
}

export function CardEditWorkout({ item, openModal }: IProps) {
  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 50 }],
      }
    })

    return (
      <Reanimated.View style={styleAnimation}>
        <Text style={styles.rightAction}>Text</Text>
      </Reanimated.View>
    )
  }

  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}>
      <TouchableOpacity
        className="relative h-28 flex-row items-center rounded-[8px] bg-secondary p-2"
        onPress={openModal}>
        <>
          <Image
            className="h-full w-20 rounded-[6px]"
            source={{
              uri: item.exerciseThumb,
            }}
            alt=""
          />

          <View className="ml-3 flex-col justify-center gap-0">
            <Text className="text-lg font-bold text-white">
              {item.exerciseTitle}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {item.sets} séries x {item.reps} repetições
            </Text>

            <Text className="text-sm text-muted-foreground">
              Carga • {item.load}
            </Text>

            <Text className="text-sm text-muted-foreground">
              Tempo de Descanso mm:ss •{' '}
              {convertSecondsToMinutes(item.restTimeBetweenSets)}
            </Text>
          </View>
        </>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  )
}

const styles = StyleSheet.create({
  rightAction: { width: 80, height: 112, backgroundColor: 'purple' },
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    height: 50,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
  },
})
