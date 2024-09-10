import React, { useContext } from 'react'
import { View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

export function Evolution() {
  const { colorScheme } = useContext(ThemeContext)

  const data = [
    { value: 250, label: 'M' },
    { value: 500, label: 'T' },
    { value: 745, label: 'W' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
  ]

  return (
    <Container>
      <Header title={'Evolução'} />

      <View className="px-5 mt-10 gap-8">
        <Heading title="Como estou indo ?" />

        <BarChart
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor={themes[colorScheme].chart5}
          data={data}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }} // adiciona cor no text no eixo x
          yAxisTextStyle={{ color: 'lightgray' }}
        />
      </View>
    </Container>
  )
}
