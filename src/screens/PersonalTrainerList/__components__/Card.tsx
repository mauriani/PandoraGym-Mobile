import { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { IPersonal } from '@_dtos_/personalDTO'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { Star } from 'lucide-react-native'

type IProps = {
  item: IPersonal
}

export function Card({ item }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <TouchableOpacity className="h-52 flex-row bg-secondary rounded-[8px] p-3 relative">
      <Image
        className="h-full w-32 rounded-[6px]"
        source={{
          uri: item.image,
        }}
        alt=""
      />

      <View className="flex-1 flex-col px-4 gap-2">
        <Text className="text-white font-bold text-[18px] mb-2">
          {item.name}
        </Text>
        <Text className="text-white text-[12px]">
          <Text className="font-bold t">Credencias • </Text>
          {item.credencial}
        </Text>
        <Text className="text-white text-[12px]">
          <Text className="font-bold t">Especialização • </Text>
          {item.especializacao}
        </Text>
        <Text className="text-white text-[12px]">
          <Text className="font-bold t">Experiência • </Text> {item.experiencia}
        </Text>

        {/* Seção de classificação com estrelas e pontos */}
        <View className="flex-row items-center mt-2">
          {/* Renderiza as estrelas preenchidas */}
          {[...Array(item.rating)].map((_, index) => (
            <Star
              key={index}
              size={16}
              color={themes[colorScheme].primary}
              fill={themes[colorScheme].primary}
            />
          ))}
          {/* Renderiza as estrelas não preenchidas */}
          {[...Array(5 - item.rating)].map((_, index) => (
            <Star key={index} size={16} color={themes[colorScheme].primary} />
          ))}
          {/* Número de pontos */}
          <Text className="text-white font-bold text-[12px] ml-2">
            • {item.rating}pts
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
