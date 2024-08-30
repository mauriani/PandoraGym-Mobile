import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { ITraining } from 'src/_dtos_'

type IProps = {
  item: ITraining
}

export function MyTrainingCard({ item }: IProps) {
  return (
    <TouchableOpacity className="h-28 flex-row bg-muted rounded-[8px] items-center p-2 relative">
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
        color={'#FDC500'}
        style={{ position: 'absolute', right: 16 }}
      />
    </TouchableOpacity>
  )
}
