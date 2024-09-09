import { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ITraining } from '@_dtos_/trainingDTO'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { ChevronRight } from 'lucide-react-native'

type IProps = {
  item: ITraining
  onAccessTraining: (id: string, name: string) => void
}

export function MyTrainingCard({ item, onAccessTraining }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <TouchableOpacity
      onPress={() => onAccessTraining(item.id, item.title)}
      className="h-28 flex-row bg-secondary rounded-[8px] items-center p-2 relative">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.image,
        }}
        alt=""
      />

      <View className="flex-col justify-center gap-[2] ml-3">
        <Text className="text-white font-bold tex-[18]">{item.title}</Text>
        <Text className="text-muted-foreground tex-[14]">
          {item.description}
        </Text>
      </View>

      <ChevronRight
        size={30}
        color={themes[colorScheme].primary}
        style={{ position: 'absolute', right: 16 }}
      />
    </TouchableOpacity>
  )
}
