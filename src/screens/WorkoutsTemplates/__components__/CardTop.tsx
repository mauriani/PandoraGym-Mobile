import { Image, Text, TouchableOpacity, View } from 'react-native'

type IProps = {
  image?: string
  personalName: string
  onNavigate: () => void
}

export function CardTop({ personalName, image, onNavigate }: IProps) {
  return (
    <View className="flex-row gap-3 items-center justify-between">
      <View className="flex-row gap-3 items-center">
        {image && (
          <Image
            className="h-10 w-10 rounded-full"
            source={{
              uri: image,
            }}
            alt=""
          />
        )}

        <Text className="text-white py-5 font-primary_bold text-base">
          {personalName}
        </Text>
      </View>
      <TouchableOpacity onPress={onNavigate}>
        <Text className="text-primary py-5 font-primary_bold text-base">
          Ver Todos
        </Text>
      </TouchableOpacity>
    </View>
  )
}
