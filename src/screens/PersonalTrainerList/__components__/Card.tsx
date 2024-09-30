import { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { IPersonalList } from '@_dtos_/personalListDTO'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { Star } from 'lucide-react-native'

import { TextDetails } from './TextDetails'

type IProps = {
  item: IPersonalList
  onPress: () => void
}

export function Card({ item, onPress }: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-56 flex-row bg-secondary rounded-[8px] p-3 relative">
      <Image
        className="h-full w-32 rounded-[6px]"
        source={{
          uri: item.user.avatarUrl,
        }}
        alt=""
      />

      <View className="flex-1 flex-col px-4 gap-2">
        <Text className="text-white font-bold text-[18px] mb-2">
          {item.user.name}
        </Text>

        <TextDetails title="Qualificações" details={item.qualifications} />

        <TextDetails title="Especialização" details={item.specialization} />

        <TextDetails title="Experiência" details={item.experience} />

        {/* Seção de classificação com estrelas e pontos */}
        <View className="flex-row items-center mt-2">
          {/* Renderiza as estrelas preenchidas */}
          {[...Array(Math.floor(item.rating))].map((_, index) => (
            <Star
              key={`filled-${index}`}
              size={16}
              color={themes[colorScheme].primary}
              fill={themes[colorScheme].primary}
            />
          ))}

          {/* Renderiza meia estrela se o rating não for inteiro */}
          {item.rating % 1 !== 0 && (
            <Star
              key="half-star"
              size={16}
              color={themes[colorScheme].primary}
              fill={themes[colorScheme].primary}
              style={{ width: 8 }} // Ajuste o estilo para exibir meia estrela
            />
          )}

          {/* Renderiza as estrelas não preenchidas */}
          {[...Array(5 - Math.ceil(item.rating))].map((_, index) => (
            <Star
              key={`empty-${index}`}
              size={16}
              color={themes[colorScheme].primary}
            />
          ))}

          {/* Número de pontos */}
          <Text className="text-white font-bold text-[12px] ml-2">
            • {item.rating.toFixed(1)} pts{' '}
            {/* Exibe o rating com 1 casa decimal */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
