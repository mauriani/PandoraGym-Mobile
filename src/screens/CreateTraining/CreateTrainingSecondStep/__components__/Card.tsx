import { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { ChevronRight, CircleCheck } from 'lucide-react-native'

type IProps = {
  item: IExercise
  openModal: () => void
}

export function Card({ item, openModal }: IProps) {
  const { colorScheme } = useContext(ThemeContext)
  return (
    <TouchableOpacity
      className="h-28 flex-row bg-secondary rounded-[8px] items-center p-2 relative"
      onPress={openModal}>
      <>
        <Image
          className="h-full w-20 rounded-[6px]"
          source={{
            uri: item.image,
          }}
          alt=""
        />

        <View className="flex-col justify-center gap-2 ml-3">
          <Text className="text-white font-bold tex-[18]">{item.title}</Text>
          <Text className="text-muted-foreground tex-[14]">
            3 séries x 12 repetições
          </Text>
        </View>
      </>

      <View className="flex-row justify-between items-center ml-auto">
        {item.isConfigurable && (
          <CircleCheck
            color={'#FDC500'}
            size={32}
            style={{ marginRight: 20 }}
          />
        )}

        <ChevronRight size={30} color={themes[colorScheme].mutedForeground} />
      </View>
    </TouchableOpacity>
  )
}
