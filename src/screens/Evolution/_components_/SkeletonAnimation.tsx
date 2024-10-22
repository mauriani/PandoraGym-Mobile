import { useContext } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/build/skeleton/native'

export function SkeletonAnimation() {
  const { colorScheme } = useContext(ThemeContext)
  const { width } = useWindowDimensions()

  return (
    <MotiView
      style={{ gap: 8, padding: 16 }}
      animate={{
        backgroundColor: colorScheme ? '#000000' : '#ffffff',
      }}>
      <View className="gap-3">
        {/* Título Frequência de Treino */}
        <Skeleton width={200} height={20} />
        <Skeleton width={120} height={18} />

        {/* Gráfico de Barras */}
        <View className="mt-5">
          <Skeleton width={width - 60} height={200} />
        </View>

        {/* Legenda */}
        <View className="items-center gap-1 mt-4">
          <View className="bg-secondary w-44 py-2 px-2">
            <Skeleton width={100} height={20} />
          </View>

          <Skeleton width={250} height={14} />
          <Skeleton width={200} height={14} />
        </View>

        {/* Evolução de Carga */}
        <Skeleton width={160} height={20} />
        <Skeleton width={width - 60} height={50} />

        {/* Gráfico de Linha */}
        <Skeleton width={'100%'} height={220} />
      </View>
    </MotiView>
  )
}
