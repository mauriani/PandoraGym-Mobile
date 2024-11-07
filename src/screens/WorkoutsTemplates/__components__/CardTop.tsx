import { Image, Text, TouchableOpacity, View } from 'react-native'

type IProps = {
  image?: string
  personalName: string
  onNavigate: () => void
}

export function CardTop({ personalName, image, onNavigate }: IProps) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <View className="flex-row items-center gap-3">
        {image && (
          <Image
            className="h-10 w-10 rounded-full"
            source={{
              uri: image,
            }}
            alt=""
          />
        )}

        <Text className="py-5 font-primary_bold text-base text-white">
          {personalName}
        </Text>
      </View>
      <TouchableOpacity onPress={onNavigate}>
        <Text className="py-5 font-primary_bold text-base text-primary">
          Ver Todos
        </Text>
      </TouchableOpacity>
    </View>
  )
}
