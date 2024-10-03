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
      onPress={() => onAccessTraining(item.id, item.name)}
      className="h-28 flex-row bg-secondary rounded-[8px] items-center p-2 relative">
      <Image
        className="h-full w-20 rounded-[6px]"
        source={{
          uri: item.thumbnail,
        }}
        alt=""
      />

      <View className="flex-1 flex-col justify-center gap-1 ml-3 pr-8">
        {/* Ajustado pr e flex-1 */}
        <Text className="text-white font-primary_bold text-base">
          {item.name}
        </Text>

        {item.exclusive && item.personalId != null && (
          <Text className="text-muted-foreground font-primary_regular text-sm">
            Criado por <Text className="font-bold">{item.personalName}</Text>
          </Text>
        )}

        <Text
          numberOfLines={2}
          className="text-muted-foreground font-primary_regular text-sm">
          {item.weekDays.join(', ')}
        </Text>
      </View>

      <ChevronRight
        size={30}
        color={themes[colorScheme].mutedForeground}
        style={{ position: 'absolute', right: 16 }}
      />
    </TouchableOpacity>
  )
}
