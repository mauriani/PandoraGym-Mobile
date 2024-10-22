import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, useWindowDimensions, View } from 'react-native'
import { BarChart, LineChart } from 'react-native-gifted-charts'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { NoContent } from '@components/NoContent'
import { SelecFormControlt } from '@components/SelecFormControlt'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/auth'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import zod from 'zod'

import { Legend } from './_components_/Legend'
import { SkeletonAnimation } from './_components_/SkeletonAnimation'

const schema = zod.object({
  exercise: zod.string(),
})

export type zodSchema = zod.infer<typeof schema>

export function Evolution() {
  const { user } = useAuth()
  const { width } = useWindowDimensions()
  const { colorScheme } = useContext(ThemeContext)
  const currentMonth = new Date().toLocaleString('pt-Br', { month: 'long' })

  const [lineData, setLineData] = useState()

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    control,
    formState: { errors },
  } = methods

  const { data, isFetching } = useQuery({
    queryKey: ['get-frequency-user', user?.user?.id],
    queryFn: async () => {
      const [response, data] = await Promise.all([
        api.get('/workout-frequency'),
        api.get('/workout-history-name-exercises'),
      ])

      const { chartData, maxDays, minDays, legend } = response.data
      const { history } = data.data

      return {
        chartData,
        options: history,
        maxDays,
        minDays,
        legend,
      }
    },
  })

  async function onGetEvolutionWeight(id) {
    try {
      await api
        .get(`/exercises-performance-comparison/${id}`)
        .then((response) => {
          if (response.status == 200) {
            setLineData(response.data?.lineData)
          }
        })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'

      toast.error(title)
    }
  }

  const hasValueGreaterThanZero = data?.chartData.some((item) => item.value > 0)

  return (
    <Container>
      <Header title="Evolução" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isFetching ? (
          <SkeletonAnimation />
        ) : (
          <View className="px-5 mt-10 gap-3 flex-1">
            {hasValueGreaterThanZero || data?.options?.length > 0 ? (
              <TrainingContent
                currentMonth={currentMonth}
                data={data}
                colorScheme={colorScheme}
                control={control}
                errors={errors}
                onGetEvolutionWeight={onGetEvolutionWeight}
                lineData={lineData}
                width={width}
              />
            ) : (
              <NoContent message="Adicione seus treinos e acompanhe cada passo da sua evolução!" />
            )}
          </View>
        )}
      </ScrollView>
    </Container>
  )
}

function TrainingContent({
  currentMonth,
  data,
  colorScheme,
  control,
  errors,
  onGetEvolutionWeight,
  lineData,
  width,
}) {
  return (
    <>
      <Text className="text-foreground font-primary_regular text-base">
        Frequência de Treino -{' '}
        <Text className="capitalize font-bold">{currentMonth}</Text>
      </Text>

      <BarChart
        barWidth={40}
        noOfSections={2}
        barBorderRadius={4}
        frontColor={themes[colorScheme].chart5}
        data={data?.chartData}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
        yAxisTextStyle={{ color: 'lightgray' }}
        maxValue={data?.maxDays}
      />

      <View className="items-center gap-1">
        <View className="bg-secondary w-44 py-2 px-2">
          <Legend data={data?.legend} />
        </View>

        <Text className="text-muted-foreground font-primary_regular text-sm">
          * S-1, S-2, etc., representam as semanas do mês de {currentMonth}.
        </Text>

        <Text className="text-muted-foreground font-primary_regular text-sm">
          Meta varia entre {data?.minDays} a {data?.maxDays} dias.
        </Text>
      </View>

      <Text className="text-foreground font-primary_regular text-base font-bold">
        Evolução de Carga
      </Text>

      <SelecFormControlt
        control={control}
        name="exercise"
        label="Exercícios"
        options={data?.options}
        error={errors.exercise}
        change={onGetEvolutionWeight}
      />

      {lineData && (
        <LineChart
          data={lineData}
          color={themes[colorScheme].chart2}
          thickness={5}
          dataPointsColor={themes[colorScheme].chart3}
          showValuesAsDataPointsText
          textColor={themes[colorScheme].foreground}
          dataPointsHeight={12}
          dataPointsWidth={12}
          textShiftY={-5}
          textShiftX={-5}
          textFontSize={14}
          width={width - 110}
          yAxisTextStyle={{ color: themes[colorScheme].mutedForeground }}
          spacing={80}
          curved
          xAxisLabelTextStyle={{ color: themes[colorScheme].mutedForeground }}
        />
      )}
    </>
  )
}
