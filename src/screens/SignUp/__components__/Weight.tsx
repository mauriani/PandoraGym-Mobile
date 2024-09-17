import React, { useContext, useRef, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import clsx from 'clsx'
import { Triangle } from 'lucide-react-native'

const weights = Array.from({ length: 141 }, (_, i) => 40 + i) // Gera os pesos de 40kg a 180kg

const ITEM_WIDTH = 60 // Ajuste a largura dos itens conforme necessário

export function Weight() {
  const { colorScheme } = useContext(ThemeContext)
  const [selectedWeight, setSelectedWeight] = useState<number | null>(43) // Peso inicial
  const scrollViewRef = useRef(null)

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x
    const index = Math.floor(offsetX / ITEM_WIDTH)

    setSelectedWeight(weights[index] + 3)
  }

  return (
    <View className="px-5">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}>
        {weights.map((weight, index) => {
          const isSelected = weight === selectedWeight
          return (
            <TouchableOpacity
              key={index}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_WIDTH,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setSelectedWeight(weight)}>
              <Text
                className={clsx(
                  'text-2xl font-primary_bold',
                  isSelected ? 'text-primary' : 'text-muted',
                )}>
                {weight}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }}>
        <Triangle
          fill={themes[colorScheme].primary}
          color={themes[colorScheme].primary}
          size={24}
        />
      </TouchableOpacity>
    </View>
  )
}
